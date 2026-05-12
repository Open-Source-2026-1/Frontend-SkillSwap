import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-tutoring-session-list',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinner, MatError, SlicePipe],
  templateUrl: './tutoring-session-list.html',
  styleUrl: './tutoring-session-list.css',
})
export class TutoringSessionList {
  readonly store = inject(WorkspaceStore);
  protected router = inject(Router);

  readonly activeFilter = signal<string>('all');

  readonly statusFilters = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'scheduled', label: 'Agendadas' },
    { value: 'completed', label: 'Completadas' },
  ];

  get filteredSessions() {
    const filter = this.activeFilter();
    return filter === 'all'
      ? this.store.tutoringSessions()
      : this.store.tutoringSessions().filter((s) => s.status === filter);
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }

  /** Navega al detalle de la sesión (muestra sus mensajes) */
  openSession(id: number): void {
    this.router.navigate(['workspace/tutoring-sessions', id]).then();
  }

  /** Navega al form de edición — detiene la propagación para no abrir el detalle */
  editSession(event: Event, id: number): void {
    event.stopPropagation();
    this.router.navigate(['workspace/tutoring-sessions/edit', id]).then();
  }

  /** Elimina la sesión — detiene la propagación */
  deleteSession(event: Event, id: number): void {
    event.stopPropagation();
    this.store.deleteTutoringSession(id);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente',
      scheduled: 'Agendada',
      completed: 'Completada',
      rejected: 'Rechazada',
    };
    return map[status] ?? status;
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'chip-pending',
      scheduled: 'chip-scheduled',
      completed: 'chip-completed',
      rejected: 'chip-rejected',
    };
    return map[status] ?? '';
  }
}
