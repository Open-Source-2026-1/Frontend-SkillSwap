import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { ReputationStore } from '../../../../reputation/application/reputation-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';

@Component({
  selector: 'app-my-tutors',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './my-tutors.html',
  styleUrl: './my-tutors.css',
})
export class MyTutors {
  private workspaceStore = inject(WorkspaceStore);
  private discoveryStore = inject(DiscoveryStore);
  private reputationStore = inject(ReputationStore);
  private fb = inject(FormBuilder);

  /** US05 — filtro por keyword (frontend only) */
  readonly searchQuery = signal<string>('');

  readonly filteredTutors = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.enrichedTutors();
    return this.enrichedTutors().filter(
        (t) =>
            t.name.toLowerCase().includes(q) ||
            t.specialty.toLowerCase().includes(q) ||
            t.skills.some((s) => s.toLowerCase().includes(q)),
    );
  });

  /**
   * Ahora sí es real: solo los tutores que el learner actual marcó como
   * favorito (GET /favorites/learner/{id}), ya no se muestra todo Discovery.
   */
  private readonly enrichedTutors = computed(() => {
    const sessions = this.workspaceStore.tutoringSessions();
    return this.discoveryStore.favoriteTutors().map((tutor) => {
      const reviews = this.reputationStore.getReviewsByTutor(tutor.id)();
      const averageRating =
          reviews.length > 0
              ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
              : 0;
      return {
        id: tutor.id,
        name: tutor.name,
        specialty: tutor.specialty,
        university: tutor.university,
        avatarUrl: tutor.avatarUrl,
        skills: tutor.skills,
        rating: averageRating,
        reviewCount: reviews.length,
        sessionCount: sessions.filter((s) => s.tutorId === tutor.id).length,
        pendingCount: sessions.filter((s) => s.tutorId === tutor.id && s.status === 'PENDING')
            .length,
        completedCount: sessions.filter((s) => s.tutorId === tutor.id && s.status === 'COMPLETED')
            .length,
      };
    });
  });

  /** US08 — modal de solicitud de tutoría */
  readonly selectedTutorId = signal<number | null>(null);
  readonly selectedTutorName = signal<string>('');

  requestForm = this.fb.group({
    topic: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    scheduledAt: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly requestSent = signal<boolean>(false);

  openRequestModal(tutorId: number, tutorName: string): void {
    this.selectedTutorId.set(tutorId);
    this.selectedTutorName.set(tutorName);
    this.requestForm.reset();
    this.requestSent.set(false);
  }

  closeModal(): void {
    this.selectedTutorId.set(null);
    this.requestSent.set(false);
  }

  submitRequest(): void {
    if (this.requestForm.invalid) return;
    this.workspaceStore.requestTutoringSession({
      learnerId: CURRENT_LEARNER_ID(),
      tutorId: this.selectedTutorId()!,
      topic: this.requestForm.value.topic!,
      message: '',
      studentLevel: '',
      scheduledAt: this.requestForm.value.scheduledAt!,
    });
    this.requestSent.set(true);
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  /** Esta vista solo muestra favoritos, así que aquí la estrella siempre "quita". */
  removeFavorite(tutorId: number): void {
    this.discoveryStore.toggleFavorite(tutorId);
  }

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
