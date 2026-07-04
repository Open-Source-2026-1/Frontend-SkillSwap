import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningStore } from '../../../application/learning-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { WorkspaceStore } from '../../../../workspace/application/workspace-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CURRENT_LEARNER_ID, CURRENT_TUTOR_ID } from '../../../../shared/infrastructure/current-user';
import { buildQuizResultMessage } from '../../../../shared/infrastructure/chat-quiz-message';

/**
 * US16 — Tomar un quiz.
 *
 * El backend calcula el score real (0-10) comparando `answers` contra el
 * `correctIndex` de cada pregunta — el front nunca manda un score inventado.
 * Mientras se espera la confirmación del backend, se muestra un conteo local
 * de aciertos (usando el mismo `correctIndex` que ya viene en el quiz) solo
 * para dar feedback visual inmediato por pregunta.
 */
@Component({
    selector: 'app-quiz-attempt',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinner],
    templateUrl: './quiz-attempt.html',
    styleUrl: './quiz-attempt.css',
})
export class QuizAttemptView {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    readonly store = inject(LearningStore);
    readonly discoveryStore = inject(DiscoveryStore);
    private workspaceStore = inject(WorkspaceStore);

    private readonly quizId = toSignal(
        this.route.params.pipe(map((p) => +p['id'])),
        { initialValue: 0 },
    );

    private readonly sessionId: number =
        +(this.route.snapshot.queryParamMap.get('sessionId') ?? 0);

    readonly quiz = computed(() =>
        this.store.quizzes().find((q) => q.id === this.quizId()),
    );

    /** Si ya existe un intento para esta sesión, no se puede repetir. */
    readonly alreadyAttempted = computed(() => this.store.hasAttemptForSession(this.sessionId));

    /** El intento oficial ya calificado por el backend, una vez que llega. */
    readonly officialAttempt = computed(() => this.store.getAttemptBySession(this.sessionId)());

    /** US16 — respuestas seleccionadas por el aprendiz */
    readonly selectedAnswers = signal<Record<number, number>>({});

    readonly submitted = signal<boolean>(false);
    /** Conteo local (solo feedback visual inmediato, no es lo que se envía al backend) */
    readonly localCorrectCount = signal<number>(0);
    private resultMessagePosted = signal<boolean>(false);

    constructor() {
        // En cuanto el backend confirma el intento (aparece en `attempts`), lo posteamos
        // al chat de la sesión (US15/16) para que quede en el historial real, visible
        // también para el moderador.
        effect(() => {
            const attempt = this.officialAttempt();
            if (attempt && this.submitted() && !this.resultMessagePosted()) {
                this.resultMessagePosted.set(true);
                const senderId =
                    attempt.learnerId === CURRENT_LEARNER_ID() ? CURRENT_LEARNER_ID() : CURRENT_TUTOR_ID();
                this.workspaceStore.sendMessage({
                    content: buildQuizResultMessage(attempt.quizId, attempt.score),
                    senderId,
                    sessionId: attempt.sessionId,
                });
            }
        });
    }

    selectAnswer(questionIndex: number, optionIndex: number): void {
        if (this.submitted()) return;
        this.selectedAnswers.update((ans) => ({
            ...ans,
            [questionIndex]: optionIndex,
        }));
    }

    allAnswered(): boolean {
        const q = this.quiz();
        if (!q) return false;
        return q.questions.every((_, i) => this.selectedAnswers()[i] !== undefined);
    }

    submit(): void {
        const q = this.quiz();
        if (!q || !this.allAnswered() || this.alreadyAttempted()) return;

        let correct = 0;
        q.questions.forEach((question, i) => {
            if (this.selectedAnswers()[i] === question.correctIndex) {
                correct++;
            }
        });
        this.localCorrectCount.set(correct);
        this.submitted.set(true);

        const answers = q.questions.map((_, i) => this.selectedAnswers()[i]);
        this.store.submitQuizAttempt(q.id, this.sessionId, answers);
    }

    isCorrect(questionIndex: number): boolean {
        const q = this.quiz();
        if (!q) return false;
        return this.selectedAnswers()[questionIndex] === q.questions[questionIndex].correctIndex;
    }

    scorePercent(): number {
        const q = this.quiz();
        if (!q || q.questions.length === 0) return 0;
        return Math.round((this.localCorrectCount() / q.questions.length) * 100);
    }

    creatorName(createdBy: number): string {
        const tutor = this.discoveryStore.tutors().find((t) => t.id === createdBy);
        return tutor ? tutor.name : `Tutor #${createdBy}`;
    }

    goBack(): void {
        if (this.sessionId) {
            this.router.navigate(['workspace/tutoring-sessions', this.sessionId]).then();
        } else {
            this.router.navigate(['learning/admin']).then();
        }
    }

    answeredCount(): number {
        return Object.keys(this.selectedAnswers()).length;
    }
}
