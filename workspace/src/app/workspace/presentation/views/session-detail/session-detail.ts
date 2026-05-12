import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { SlicePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TutoringSession } from '../../../domain/model/tutoring-session.entity';

@Component({
  selector: 'app-session-detail',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinner, MatError, SlicePipe],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.css',
})
export class SessionDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly store = inject(WorkspaceStore);

  private readonly sessionId = toSignal(this.route.params.pipe(map((p) => +p['id'])), {
    initialValue: 0,
  });

  readonly session = computed(() =>
    this.store.tutoringSessions().find((s) => s.id === this.sessionId()),
  );

  /** US10 — mensajes solo si la sesión está en 'scheduled' */
  readonly sessionMessages = computed(() => {
    if (this.session()?.status !== 'scheduled') return [];
    return this.store.messages().filter((m) => m.sessionId === this.sessionId());
  });

  readonly canChat = computed(() => this.session()?.status === 'scheduled');

  /** US21 — puede cancelar si está pending o scheduled */
  readonly canCancel = computed(() => {
    const s = this.session()?.status;
    return s === 'pending' || s === 'scheduled';
  });

  /** US09 — puede aceptar/rechazar solo si está pending */
  readonly isPending = computed(() => this.session()?.status === 'pending');

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente',
      scheduled: 'Agendada',
      completed: 'Completada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada',
    };
    return map[status] ?? status;
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'chip-pending',
      scheduled: 'chip-scheduled',
      completed: 'chip-completed',
      rejected: 'chip-rejected',
      cancelled: 'chip-cancelled',
    };
    return map[status] ?? '';
  }

  /** US09 — Aceptar: cambia status a 'scheduled' */
  acceptSession(): void {
    const s = this.session();
    if (!s) return;
    const updated = new TutoringSession({
      id: s.id,
      topic: s.topic,
      learnerId: s.learnerId,
      tutorId: s.tutorId,
      scheduledAt: s.scheduledAt,
      status: 'scheduled',
    });
    this.store.updateTutoringSession(updated);
  }

  /** US09 — Rechazar: cambia status a 'rejected' */
  rejectSession(): void {
    const s = this.session();
    if (!s) return;
    const updated = new TutoringSession({
      id: s.id,
      topic: s.topic,
      learnerId: s.learnerId,
      tutorId: s.tutorId,
      scheduledAt: s.scheduledAt,
      status: 'rejected',
    });
    this.store.updateTutoringSession(updated);
  }

  /** US21 — Cancelar: cambia status a 'cancelled' */
  cancelSession(): void {
    const s = this.session();
    if (!s) return;
    const updated = new TutoringSession({
      id: s.id,
      topic: s.topic,
      learnerId: s.learnerId,
      tutorId: s.tutorId,
      scheduledAt: s.scheduledAt,
      status: 'cancelled',
    });
    this.store.updateTutoringSession(updated);
  }

  deleteMessage(id: number): void {
    this.store.deleteMessage(id);
  }

  goBack(): void {
    this.router.navigate(['workspace/tutoring-sessions']).then();
  }

  addMessage(): void {
    this.router
      .navigate(['workspace/messages/new'], { queryParams: { sessionId: this.sessionId() } })
      .then();
  }
}
