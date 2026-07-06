import { Injectable } from '@angular/core';
import { computed, effect, Signal, signal } from '@angular/core';
import { Quiz } from '../domain/model/quiz.entity';
import { QuizAttempt } from '../domain/model/quiz-attempt.entity';
import { LearningApi } from '../infrastructure/learning-api';
import { CreateQuizRequest } from '../domain/model/create-quiz.request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry, switchMap } from 'rxjs';
import { IamStore } from '../../iam/application/iam-store';
import { CURRENT_LEARNER_ID } from '../../shared/infrastructure/current-user';

@Injectable({
    providedIn: 'root',
})
export class LearningStore {
    private readonly quizzesSignal = signal<Quiz[]>([]);
    private readonly attemptsSignal = signal<QuizAttempt[]>([]);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);

    readonly quizzes = this.quizzesSignal.asReadonly();
    readonly attempts = this.attemptsSignal.asReadonly();
    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();

    readonly quizCount = computed(() => this.quizzes().length);

    /** Cursos únicos para filtrar */
    readonly courses = computed(() => {
        const uniq = [...new Set(this.quizzes().map((q) => q.course))].sort();
        return uniq;
    });

    constructor(
        private learningApi: LearningApi,
        private iamStore: IamStore,
    ) {
        this.loadQuizzes();
        effect(() => {
            if (this.iamStore.isSignedIn()) {
                this.loadMyAttempts();
            } else {
                this.attemptsSignal.set([]);
            }
        });
    }

    getQuizById(id: number | null | undefined): Signal<Quiz | undefined> {
        return computed(() => (id ? this.quizzes().find((q) => q.id === id) : undefined));
    }

    /** Quizzes filtrados por curso */
    getQuizzesByCourse(course: string): Signal<Quiz[]> {
        return computed(() =>
            course === 'all'
                ? this.quizzes()
                : this.quizzes().filter((q) => q.course === course),
        );
    }

    /**
     * El backend no tiene GET /quiz-attempts/session/{id}, así que esta validación
     * de "no repetir el quiz en la misma sesión" queda 100% en el front, contra
     * los intentos ya cargados del learner actual.
     */
    hasAttemptForSession(sessionId: number): boolean {
        return this.attempts().some((a) => a.sessionId === sessionId);
    }

    getAttemptBySession(sessionId: number): Signal<QuizAttempt | undefined> {
        return computed(() => this.attempts().find((a) => a.sessionId === sessionId));
    }

    /** US14 — crear quiz (tutor/profesor) */
    addQuiz(request: CreateQuizRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.learningApi
            .createQuiz(request)
            .pipe(retry(2))
            .subscribe({
                next: (created) => {
                    this.quizzesSignal.update((quizzes) => [...quizzes, created]);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo crear el quiz'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /** Sin validación de integridad en el backend: puede dejar QuizAttempts huérfanos (se advierte en la UI). */
    deleteQuiz(id: number): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.learningApi
            .deleteQuiz(id)
            .pipe(retry(2))
            .subscribe({
                next: () => {
                    this.quizzesSignal.update((quizzes) => quizzes.filter((q) => q.id !== id));
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo eliminar el quiz'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /**
     * US16 — flujo completo: inicia el intento (POST) y de inmediato lo completa
     * (PATCH /complete) con las respuestas — el backend calcula el score real
     * comparando contra el correctIndex de cada pregunta.
     */
    submitQuizAttempt(quizId: number, sessionId: number, answers: number[]): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.learningApi
            .startAttempt({ quizId, learnerId: CURRENT_LEARNER_ID(), sessionId })
            .pipe(
                retry(2),
                switchMap((started) => this.learningApi.completeAttempt(started.id, answers)),
            )
            .subscribe({
                next: (completed) => {
                    this.attemptsSignal.update((attempts) => [...attempts, completed]);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo enviar el intento del quiz'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private loadQuizzes(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.learningApi
            .getQuizzes()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (quizzes) => {
                    this.quizzesSignal.set(quizzes);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar los quizzes'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private loadMyAttempts(): void {
        this.learningApi
            .getMyAttempts(CURRENT_LEARNER_ID())
            .subscribe({
                next: (attempts) => this.attemptsSignal.set(attempts),
                error: (err) =>
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar tus intentos')),
            });
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}
