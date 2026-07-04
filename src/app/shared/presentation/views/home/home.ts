import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceStore } from '../../../../workspace/application/workspace-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { ReputationStore } from '../../../../reputation/application/reputation-store';
import { PaymentsStore } from '../../../../payments/application/payments-store';
import { IamStore } from '../../../../iam/application/iam-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SlicePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinner, SlicePipe, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly discoveryStore = inject(DiscoveryStore);
  readonly reputationStore = inject(ReputationStore);
  readonly paymentsStore = inject(PaymentsStore);
  readonly iamStore = inject(IamStore);

  /** Ya no es un mock: sale del usuario real logueado en IamStore. */
  readonly currentUser = computed(() => {
    const user = this.iamStore.currentUser();
    return {
      name: user?.fullName ?? '',
      subtitle: user ? user.roles.map((r) => (r === 'ROLE_TUTOR' ? 'Tutor' : 'Aprendiz')).join(' · ') : '',
    };
  });

  readonly recentSessions = computed(() =>
      this.workspaceStore.tutoringSessions().slice().reverse().slice(0, 3),
  );

  readonly incomingRequests = computed(() => {
    const tutorId = this.iamStore.currentTutorId();
    if (tutorId === null) return [];
    return this.workspaceStore
        .tutoringSessions()
        .filter((s) => s.tutorId === tutorId && s.status === 'PENDING');
  });

  readonly availableTutors = computed(() =>
      this.discoveryStore.tutors().filter((t) => t.available).slice(0, 3),
  );

  readonly stats = computed(() => {
    const sessions = this.workspaceStore.tutoringSessions();
    return {
      total: sessions.length,
      completed: sessions.filter((s) => s.status === 'COMPLETED').length,
      pending: sessions.filter((s) => s.status === 'PENDING').length,
      scheduled: sessions.filter((s) => s.status === 'SCHEDULED').length,
    };
  });

  getTutorName(tutorId: number): string {
    const tutor = this.discoveryStore.tutors().find((t) => t.id === tutorId);
    return tutor ? tutor.name : `Tutor #${tutorId}`;
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente', scheduled: 'Confirmada',
      completed: 'Completada', rejected: 'Rechazada', cancelled: 'Cancelada',
    };
    return map[status] ?? status;
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'chip-pending', scheduled: 'chip-scheduled',
      completed: 'chip-completed', rejected: 'chip-rejected', cancelled: 'chip-cancelled',
    };
    return map[status] ?? '';
  }

  greetingTime(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }

  goToSessions(): void { this.router.navigate(['workspace/tutoring-sessions']).then(); }
  goToDiscover(): void { this.router.navigate(['discovery/tutors']).then(); }
  goToSession(id: number): void { this.router.navigate(['workspace/tutoring-sessions', id]).then(); }
  goToTutor(id: number): void { this.router.navigate(['discovery/tutors', id]).then(); }
  goToWallet(): void { this.router.navigate(['payments/wallet']).then(); }
  goToProfile(): void { this.router.navigate(['reputation/my-profile']).then(); }
}