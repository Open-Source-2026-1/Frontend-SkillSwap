import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { SessionStatus } from '../../../domain/model/session-status';
import { CURRENT_LEARNER_ID, CURRENT_TUTOR_ID } from '../../../../shared/infrastructure/current-user';

type RoleFilter = 'learner' | 'tutor';

@Component({
  selector: 'app-tutoring-session-list',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinner, MatError, DatePipe],
  templateUrl: './tutoring-session-list.html',
  styleUrl: './tutoring-session-list.css',
})
export class TutoringSessionList {
  readonly store = inject(WorkspaceStore);
  protected router = inject(Router);
  readonly discoveryStore = inject(DiscoveryStore);

  /** US08/US09 — la misma persona puede ver sus solicitudes como Aprendiz o como Tutor */
  readonly roleFilter = signal<RoleFilter>('learner');
  readonly statusFilter = signal<SessionStatus | 'all'>('all');

  readonly statusFilters: { value: SessionStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'PENDING', label: 'Pendientes' },
    { value: 'SCHEDULED', label: 'Agendadas' },
    { value: 'COMPLETED', label: 'Completadas' },
    { value: 'REJECTED', label: 'Rechazadas' },
    { value: 'CANCELLED', label: 'Canceladas' },
  ];

  readonly filteredSessions = computed(() => {
    const role = this.roleFilter();
    const status = this.statusFilter();
    const ownerId = role === 'learner' ? CURRENT_LEARNER_ID() : CURRENT_TUTOR_ID();
    return this.store
        .tutoringSessions()
        .filter((s) => (role === 'learner' ? s.learnerId === ownerId : s.tutorId === ownerId))
        .filter((s) => status === 'all' || s.status === status)
        .sort((a, b) => b.id - a.id);
  });

  setRole(role: RoleFilter): void {
    this.roleFilter.set(role);
    // refresca desde el backend por si hay solicitudes nuevas (ej. un tutor que acaba de recibir una)
    if (role === 'learner') {
      this.store.loadSessionsAsLearner();
    } else {
      this.store.loadSessionsAsTutor();
    }
  }

  setStatusFilter(value: SessionStatus | 'all'): void {
    this.statusFilter.set(value);
  }

  /** Navega al detalle de la sesión (muestra info + chat + acciones) */
  openSession(id: number): void {
    this.router.navigate(['workspace/tutoring-sessions', id]).then();
  }

  statusLabel(status: SessionStatus): string {
    const map: Record<SessionStatus, string> = {
      PENDING: 'Pendiente',
      SCHEDULED: 'Agendada',
      COMPLETED: 'Completada',
      REJECTED: 'Rechazada',
      CANCELLED: 'Cancelada',
    };
    return map[status] ?? status;
  }

  statusClass(status: SessionStatus): string {
    const map: Record<SessionStatus, string> = {
      PENDING: 'chip-pending',
      SCHEDULED: 'chip-scheduled',
      COMPLETED: 'chip-completed',
      REJECTED: 'chip-rejected',
      CANCELLED: 'chip-cancelled',
    };
    return map[status] ?? '';
  }

  getTutorName(tutorId: number): string {
    const tutor = this.discoveryStore.tutors().find((t) => t.id === tutorId);
    return tutor ? tutor.name : `Tutor #${tutorId}`;
  }

  getLearnerName(learnerId: number): string {
    const names: Record<number, string> = {
      101: 'Valeria Torres',
      102: 'Jazmín Rosas',
      103: 'Luis Becerra',
      104: 'Rafael Pacheco',
      108: 'Santiago Vargas',
    };
    return names[learnerId] ?? `Aprendiz #${learnerId}`;
  }
}
