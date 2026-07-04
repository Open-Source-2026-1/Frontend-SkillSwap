import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkspaceStore } from '../../../application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SessionStatus } from '../../../domain/model/session-status';
import { LearningStore } from '../../../../learning/application/learning-store';
import { ModerationStore } from '../../../../moderation/application/moderation-store';
import { PaymentsStore } from '../../../../payments/application/payments-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { IamStore } from '../../../../iam/application/iam-store';
import { CURRENT_LEARNER_ID, CURRENT_TUTOR_ID } from '../../../../shared/infrastructure/current-user';
import {
  buildQuizMessage,
  isQuizMessage,
  isQuizResultMessage,
  parseQuizMessage,
  parseQuizResultMessage,
} from '../../../../shared/infrastructure/chat-quiz-message';
import { buildFileMessage, isFileMessage, parseFileMessage } from '../../../../shared/infrastructure/chat-file-message';
import { CloudinaryUploadService } from '../../../../shared/infrastructure/cloudinary-upload.service';

@Component({
  selector: 'app-session-detail',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.css',
})
export class SessionDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  readonly store = inject(WorkspaceStore);
  readonly learningStore = inject(LearningStore);
  readonly discoveryStore = inject(DiscoveryStore);
  readonly moderationStore = inject(ModerationStore);
  readonly paymentsStore = inject(PaymentsStore);
  readonly iamStore = inject(IamStore);
  private cloudinary = inject(CloudinaryUploadService);

  private readonly sessionId = toSignal(this.route.params.pipe(map((p) => +p['id'])), {
    initialValue: 0,
  });

  readonly session = computed(() => this.store.getTutoringSessionById(this.sessionId())());

  readonly canDonate = computed(() => this.session()?.status === 'COMPLETED');

  /** US10 — mensajes solo si la sesión está en 'SCHEDULED' */
  readonly sessionMessages = computed(() => {
    if (this.session()?.status !== 'SCHEDULED') return [];
    return this.store.messages().filter((m) => m.sessionId === this.sessionId());
  });

  readonly canChat = computed(() => this.session()?.status === 'SCHEDULED');

  /**
   * US12 — Videollamada. Sin WebRTC real (fuera de alcance de este proyecto,
   * es la historia técnica US28 de otro equipo): se simula igual que el pago
   * con Stripe. Lo que SÍ es real es "Finalizar sesión", que dispara de
   * verdad el PATCH a COMPLETED en el backend.
   */
  readonly callStarted = signal<boolean>(false);

  /** US21 — puede cancelar si está pending o scheduled */
  readonly canCancel = computed(() => {
    const s = this.session()?.status;
    return s === 'PENDING' || s === 'SCHEDULED';
  });

  /** US09 — puede aceptar/rechazar solo si está pending */
  readonly isPending = computed(() => this.session()?.status === 'PENDING');

  /** US15 — el tutor elige explícitamente cuál quiz enviar (ya no se auto-adivina). */
  readonly selectedQuizToSend = signal<number | null>(null);

  /** US11 — compartir archivos en el chat (sube directo a Cloudinary) */
  readonly uploadingFile = signal<boolean>(false);
  readonly fileUploadError = signal<string | null>(null);

  /** Composer del chat, inline (US10) */
  messageForm = this.fb.group({
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    // Carga la sesión real por id (no depende de que ya esté en el cache).
    effect(() => {
      const id = this.sessionId();
      if (id) this.store.loadSessionById(id);
    });

    // Una vez que sabemos que está 'SCHEDULED', cargamos el historial de chat real.
    effect(() => {
      const s = this.session();
      if (s && s.status === 'SCHEDULED') {
        this.store.loadMessagesForSession(s.id);
      }
    });
  }

  /** Quién manda el mensaje, inferido según el rol que Valeria tiene en ESTA sesión. */
  private currentSenderId(): number {
    const s = this.session();
    if (!s) return CURRENT_LEARNER_ID();
    return s.learnerId === CURRENT_LEARNER_ID() ? CURRENT_LEARNER_ID() : CURRENT_TUTOR_ID();
  }

  /** US15 — el tutor envía el quiz elegido, como un mensaje real en el chat. */
  sendQuizToChat(): void {
    const s = this.session();
    const quizId = this.selectedQuizToSend();
    if (!s || !quizId) return;
    const quiz = this.learningStore.quizzes().find((q) => q.id === quizId);
    if (!quiz) return;

    this.store.sendMessage({
      content: buildQuizMessage(quiz.id, quiz.title),
      senderId: this.currentSenderId(),
      sessionId: s.id,
    });
    this.selectedQuizToSend.set(null);
  }

  isQuizMessage = isQuizMessage;
  isQuizResultMessage = isQuizResultMessage;
  isFileMessage = isFileMessage;

  quizTitleFromMessage(content: string): string {
    return parseQuizMessage(content)?.title ?? '';
  }

  quizIdFromMessage(content: string): number {
    return parseQuizMessage(content)?.quizId ?? 0;
  }

  quizResultTextFromMessage(content: string): string {
    return parseQuizResultMessage(content)?.resultText ?? '';
  }

  parseFile(content: string) {
    return parseFileMessage(content);
  }

  /** US11 — el usuario elige un archivo del input oculto y se sube directo a Cloudinary. */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // permite volver a elegir el mismo archivo después
    if (!file) return;

    const s = this.session();
    if (!s) return;

    const validationError = this.cloudinary.validateFile(file);
    if (validationError) {
      this.fileUploadError.set(validationError);
      return;
    }

    this.uploadingFile.set(true);
    this.fileUploadError.set(null);

    this.cloudinary.upload(file).subscribe({
      next: (uploaded) => {
        this.store.sendMessage({
          content: buildFileMessage(uploaded.fileType, uploaded.fileName, uploaded.url),
          senderId: this.currentSenderId(),
          sessionId: s.id,
        });
        this.uploadingFile.set(false);
      },
      error: (err) => {
        this.fileUploadError.set(err instanceof Error ? err.message : 'No se pudo subir el archivo');
        this.uploadingFile.set(false);
      },
    });
  }

  /** US16 — para saber si ya se completó el quiz de esta sesión (no se puede repetir). */
  sessionHasQuizAttempt(): boolean {
    return this.learningStore.hasAttemptForSession(this.sessionId());
  }

  /** US16 — abrir el quiz enviado, directo desde la tarjeta en el chat. */
  openQuizById(quizId: number): void {
    this.router
        .navigate(['learning/quiz', quizId, 'attempt'], { queryParams: { sessionId: this.sessionId() } })
        .then();
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

  /** US09 — Aceptar: PATCH status -> SCHEDULED */
  acceptSession(): void {
    const s = this.session();
    if (!s) return;
    this.store.respondToRequest(s.id, true);
  }

  /** US09 — Rechazar: PATCH status -> REJECTED */
  rejectSession(): void {
    const s = this.session();
    if (!s) return;
    this.store.respondToRequest(s.id, false);
  }

  /** US21 — Cancelar: PATCH status -> CANCELLED */
  cancelSession(): void {
    const s = this.session();
    if (!s) return;
    this.store.cancelSession(s.id);
  }

  startVideoCall(): void {
    this.callStarted.set(true);
  }

  /** Al finalizar, la sesión pasa de verdad a COMPLETED en el backend. */
  endVideoCall(): void {
    const s = this.session();
    if (!s) return;
    this.store.completeSession(s.id);
    this.callStarted.set(false);
  }

  leaveReview(): void {
    const s = this.session();
    if (!s) return;
    const tutor = this.discoveryStore.tutors().find((t) => t.id === s.tutorId);
    const tutorName = tutor ? tutor.name : 'Tutor #' + s.tutorId;
    this.router
        .navigate(['reputation/review/new'], {
          queryParams: { tutorId: s.tutorId, tutorName, sessionId: s.id },
        })
        .then();
  }

  reportUser(): void {
    const s = this.session();
    if (!s) return;
    const tutor = this.discoveryStore.tutors().find((t) => t.id === s.tutorId);
    const reportedName = tutor ? tutor.name : 'Tutor #' + s.tutorId;
    this.router
        .navigate(['moderation/report/new'], {
          queryParams: { sessionId: s.id, reportedUserId: s.tutorId, reportedUserName: reportedName },
        })
        .then();
  }

  /** Envía el mensaje sin salir de la pantalla. */
  sendMessage(): void {
    if (this.messageForm.invalid) return;
    const s = this.session();
    if (!s) return;
    this.store.sendMessage({
      content: this.messageForm.value.content!,
      senderId: this.currentSenderId(),
      sessionId: s.id,
    });
    this.messageForm.reset();
  }

  goBack(): void {
    this.router.navigate(['workspace/tutoring-sessions']).then();
  }

  goToAdmin(): void {
    this.router.navigate(['learning/admin']).then();
  }

  donate(): void {
    const s = this.session();
    if (!s) return;
    this.router
        .navigate(['payments/donate'], {
          queryParams: { tutorId: s.tutorId, tutorName: 'Tutor #' + s.tutorId, sessionId: s.id },
        })
        .then();
  }
}
