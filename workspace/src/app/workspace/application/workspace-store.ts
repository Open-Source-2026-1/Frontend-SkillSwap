import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { Message } from '../domain/model/message.entity';
import { WorkspaceApi } from '../infrastructure/workspace-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WorkspaceStore {
  private readonly tutoringSessionsSignal = signal<TutoringSession[]>([]);
  private readonly messagesSignal = signal<Message[]>([]);

  readonly tutoringSessions = this.tutoringSessionsSignal.asReadonly();
  readonly messages = this.messagesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly sessionCount = computed(() => this.tutoringSessions().length);
  readonly messageCount = computed(() => this.messages().length);

  constructor(private workspaceApi: WorkspaceApi) {
    this.loadTutoringSessions();
    this.loadMessages();
  }

  /**
   * Retrieves a tutoring session by its ID as a signal.
   * @param id - The ID of the tutoring session.
   * @returns A Signal containing the TutoringSession object or undefined if not found.
   */
  getTutoringSessionById(id: number | null | undefined): Signal<TutoringSession | undefined> {
    return computed(() => (id ? this.tutoringSessions().find((s) => s.id === id) : undefined));
  }

  // --- CRUD TutoringSession ---

  /**
   * Adds a new tutoring session.
   */
  addTutoringSession(session: TutoringSession): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .createTutoringSession(session)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.tutoringSessionsSignal.update((sessions) => [...sessions, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create tutoring session'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing tutoring session.
   */
  updateTutoringSession(updated: TutoringSession): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .updateTutoringSession(updated)
      .pipe(retry(2))
      .subscribe({
        next: (session) => {
          this.tutoringSessionsSignal.update((sessions) =>
            sessions.map((s) => (s.id === session.id ? session : s)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update tutoring session'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a tutoring session by ID.
   */
  deleteTutoringSession(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .deleteTutoringSession(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.tutoringSessionsSignal.update((sessions) => sessions.filter((s) => s.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete tutoring session'));
          this.loadingSignal.set(false);
        },
      });
  }

  // --- CRUD Message ---

  /**
   * Adds a new message.
   */
  addMessage(message: Message): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .createMessage(message)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.messagesSignal.update((messages) => [...messages, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create message'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing message.
   */
  updateMessage(updated: Message): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .updateMessage(updated)
      .pipe(retry(2))
      .subscribe({
        next: (message) => {
          this.messagesSignal.update((messages) =>
            messages.map((m) => (m.id === message.id ? message : m)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update message'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a message by ID.
   */
  deleteMessage(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .deleteMessage(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.messagesSignal.update((messages) => messages.filter((m) => m.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete message'));
          this.loadingSignal.set(false);
        },
      });
  }

  // --- Private loaders ---

  private loadTutoringSessions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .getTutoringSessions()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (sessions) => {
          console.log(sessions);
          this.tutoringSessionsSignal.set(sessions);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load tutoring sessions'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadMessages(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.workspaceApi
      .getMessages()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (messages) => {
          this.messagesSignal.set(messages);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load messages'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
export class LearningStore {}
