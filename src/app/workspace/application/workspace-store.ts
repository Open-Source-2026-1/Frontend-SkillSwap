import { Injectable, computed, effect, signal } from '@angular/core';
import { retry } from 'rxjs';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { Message } from '../domain/model/message.entity';
import { SessionStatus } from '../domain/model/session-status';
import { CreateTutoringSessionRequest } from '../domain/model/create-tutoring-session.request';
import { CreateMessageRequest } from '../domain/model/create-message.request';
import { WorkspaceApi } from '../infrastructure/workspace-api';
import { IamStore } from '../../iam/application/iam-store';
import { CURRENT_LEARNER_ID, CURRENT_TUTOR_ID } from '../../shared/infrastructure/current-user';


@Injectable({
    providedIn: 'root',
})
export class WorkspaceStore {
    private readonly sessionsCache = signal<Map<number, TutoringSession>>(new Map());
    private readonly messagesCache = signal<Map<number, Message>>(new Map());

    /** Compatibilidad con vistas fuera de Workspace (Home, Coordinator, TutorDetail). */
    readonly tutoringSessions = computed(() => Array.from(this.sessionsCache().values()));
    readonly messages = computed(() => Array.from(this.messagesCache().values()));

    private readonly loadingSignal = signal<boolean>(false);
    readonly loading = this.loadingSignal.asReadonly();

    private readonly errorSignal = signal<string | null>(null);
    readonly error = this.errorSignal.asReadonly();

    constructor(
        private workspaceApi: WorkspaceApi,
        private iamStore: IamStore,
    ) {

        effect(() => {
            if (this.iamStore.isSignedIn()) {
                this.loadSessionsAsLearner();
            } else {
                this.sessionsCache.set(new Map());
                this.messagesCache.set(new Map());
            }
        });

        effect(() => {
            if (this.iamStore.currentTutorId() !== null) {
                this.loadSessionsAsTutor();
            }
        });
    }

    /** Sesión puntual desde el cache, como Signal reactivo. */
    getTutoringSessionById(id: number | null | undefined) {
        return computed(() => (id ? this.sessionsCache().get(id) : undefined));
    }

    // --- Loaders (GET) ---

    loadSessionsAsLearner(learnerId: number = CURRENT_LEARNER_ID()): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.workspaceApi.getTutoringSessionsByLearnerId(learnerId).subscribe({
            next: (sessions) => {
                this.upsertSessions(sessions);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudieron cargar tus solicitudes'));
                this.loadingSignal.set(false);
            },
        });
    }

    loadSessionsAsTutor(tutorId: number = CURRENT_TUTOR_ID()): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.workspaceApi.getTutoringSessionsByTutorId(tutorId).subscribe({
            next: (sessions) => {
                this.upsertSessions(sessions);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudieron cargar tus sesiones como tutor'));
                this.loadingSignal.set(false);
            },
        });
    }

    /** Trae una sesión puntual por id (deep-link, moderación, etc). */
    loadSessionById(sessionId: number): void {
        if (!sessionId) return;
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.workspaceApi.getTutoringSessionById(sessionId).subscribe({
            next: (session) => {
                this.upsertSession(session);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudo cargar la sesión'));
                this.loadingSignal.set(false);
            },
        });
    }

    /** US10 — carga el historial de chat de una sesión (solo válido si está 'SCHEDULED'). */
    loadMessagesForSession(sessionId: number): void {
        if (!sessionId) return;
        this.workspaceApi.getMessagesBySessionId(sessionId).subscribe({
            next: (msgs) => this.upsertMessages(msgs),
            error: (err) => this.errorSignal.set(this.formatError(err, 'No se pudieron cargar los mensajes')),
        });
    }

    // --- Comandos (POST / PATCH) ---

    /** US08 — Learner envía una solicitud de tutoría. */
    requestTutoringSession(request: CreateTutoringSessionRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.workspaceApi
            .requestTutoringSession(request)
            .pipe(retry(2))
            .subscribe({
                next: (created) => {
                    this.upsertSession(created);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo enviar la solicitud de tutoría'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /** US09 — Tutor acepta (-> SCHEDULED) o rechaza (-> REJECTED) una solicitud pendiente. */
    respondToRequest(sessionId: number, accept: boolean): void {
        this.updateStatus(sessionId, accept ? 'SCHEDULED' : 'REJECTED');
    }

    /** US21 — Learner cancela una solicitud 'PENDING' o 'SCHEDULED'. */
    cancelSession(sessionId: number): void {
        this.updateStatus(sessionId, 'CANCELLED');
    }

    /** Marca la sesión como completada (posterior a la videollamada). */
    completeSession(sessionId: number): void {
        this.updateStatus(sessionId, 'COMPLETED');
    }

    private updateStatus(sessionId: number, status: SessionStatus): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.workspaceApi.updateTutoringSessionStatus(sessionId, status).subscribe({
            next: (updated) => {
                this.upsertSession(updated);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudo actualizar el estado de la sesión'));
                this.loadingSignal.set(false);
            },
        });
    }

    /** US10 — envía un mensaje al chat de una sesión 'SCHEDULED'. */
    sendMessage(request: CreateMessageRequest): void {
        this.errorSignal.set(null);
        this.workspaceApi.sendMessage(request).subscribe({
            next: (created) => this.upsertMessage(created),
            error: (err) => this.errorSignal.set(this.formatError(err, 'No se pudo enviar el mensaje')),
        });
    }

    // --- Cache helpers ---

    private upsertSession(session: TutoringSession): void {
        this.sessionsCache.update((map) => new Map(map).set(session.id, session));
    }

    private upsertSessions(sessions: TutoringSession[]): void {
        this.sessionsCache.update((map) => {
            const next = new Map(map);
            sessions.forEach((s) => next.set(s.id, s));
            return next;
        });
    }

    private upsertMessage(message: Message): void {
        this.messagesCache.update((map) => new Map(map).set(message.id, message));
    }

    private upsertMessages(messages: Message[]): void {
        this.messagesCache.update((map) => {
            const next = new Map(map);
            messages.forEach((m) => next.set(m.id, m));
            return next;
        });
    }

    private formatError(error: any, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}
