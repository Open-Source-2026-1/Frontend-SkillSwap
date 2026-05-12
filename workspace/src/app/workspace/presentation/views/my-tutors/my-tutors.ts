import { Component, computed, inject, signal } from '@angular/core';
import { WorkspaceStore } from '../../../application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TutoringSession } from '../../../domain/model/tutoring-session.entity';

interface MockTutor {
  id: number;
  name: string;
  specialty: string;
  university: string;
  avatar: string;
  rating: number;
  skills: string[];
}

const MOCK_TUTORS: MockTutor[] = [
  {
    id: 201,
    name: 'Carlos Mendoza',
    specialty: 'Matemáticas',
    university: 'UPC',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.8,
    skills: ['Cálculo', 'Álgebra', 'Estadística'],
  },
  {
    id: 202,
    name: 'Ana Lucía Ríos',
    specialty: 'Programación',
    university: 'PUCP',
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 4.6,
    skills: ['Python', 'Java', 'POO'],
  },
  {
    id: 203,
    name: 'Diego Salazar',
    specialty: 'Física',
    university: 'UNI',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.9,
    skills: ['Dinámica', 'Termodinámica', 'Óptica'],
  },
  {
    id: 204,
    name: 'Sofía Paredes',
    specialty: 'Base de Datos',
    university: 'UP',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.7,
    skills: ['SQL', 'PostgreSQL', 'MongoDB'],
  },
];

@Component({
  selector: 'app-my-tutors',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './my-tutors.html',
  styleUrl: './my-tutors.css',
})
export class MyTutors {
  private store = inject(WorkspaceStore);
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

  private readonly enrichedTutors = computed(() => {
    const sessions = this.store.tutoringSessions();
    return MOCK_TUTORS.map((tutor) => ({
      ...tutor,
      sessionCount: sessions.filter((s) => s.tutorId === tutor.id).length,
      pendingCount: sessions.filter((s) => s.tutorId === tutor.id && s.status === 'pending').length,
      completedCount: sessions.filter((s) => s.tutorId === tutor.id && s.status === 'completed')
        .length,
    }));
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
    const session = new TutoringSession({
      id: 0,
      topic: this.requestForm.value.topic!,
      status: 'pending',
      learnerId: 101, // mock: learner actual
      tutorId: this.selectedTutorId()!,
      scheduledAt: this.requestForm.value.scheduledAt!,
    });
    this.store.addTutoringSession(session);
    this.requestSent.set(true);
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
