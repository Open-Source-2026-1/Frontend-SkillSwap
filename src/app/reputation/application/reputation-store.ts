import { Injectable } from '@angular/core';
import { computed, effect, Signal, signal } from '@angular/core';
import { Review } from '../domain/model/review.entity';
import { ReputationApi } from '../infrastructure/reputation-api';
import { CreateReviewRequest } from '../domain/model/create-review.request';
import { IamStore } from '../../iam/application/iam-store';
import { retry } from 'rxjs';
import { CURRENT_TUTOR_ID } from '../../shared/infrastructure/current-user';

@Injectable({
    providedIn: 'root',
})
export class ReputationStore {
    private readonly reviewsSignal = signal<Review[]>([]);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);

    readonly reviews = this.reviewsSignal.asReadonly();
    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();

    readonly reviewCount = computed(() => this.reviews().length);

    /** Reseñas del tutor actual (Valeria, como tutor) */
    readonly myReviews = computed(() =>
        this.reviews().filter((r) => r.tutorId === CURRENT_TUTOR_ID()),
    );

    /** Rating promedio del tutor actual */
    readonly myAverageRating = computed(() => {
        const mine = this.myReviews();
        if (mine.length === 0) return 0;
        const sum = mine.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / mine.length) * 10) / 10;
    });

    constructor(private reputationApi: ReputationApi, private iamStore: IamStore) {
        effect(() => {
            if (this.iamStore.isSignedIn()) {
                this.loadReviews();
            } else {
                this.reviewsSignal.set([]);
            }
        });
    }

    /** Reseñas filtradas por tutorId — para usar en tutor-detail */
    getReviewsByTutor(tutorId: number): Signal<Review[]> {
        return computed(() => this.reviews().filter((r) => r.tutorId === tutorId));
    }

    /** Rating promedio de cualquier tutor */
    getAverageRatingByTutor(tutorId: number): Signal<number> {
        return computed(() => {
            const list = this.reviews().filter((r) => r.tutorId === tutorId);
            if (list.length === 0) return 0;
            const sum = list.reduce((acc, r) => acc + r.rating, 0);
            return Math.round((sum / list.length) * 10) / 10;
        });
    }

    /**
     * El backend no tiene GET /reviews/session/{sessionId}, así que esta validación
     * de "no reseñar la misma sesión dos veces" queda 100% en el front: revisamos
     * en la lista ya cargada si esa sesión ya tiene una reseña.
     */
    hasReviewForSession(sessionId: number): boolean {
        return this.reviews().some((r) => r.sessionId === sessionId);
    }

    /** US17 — agregar reseña (solo válido si la sesión ya está COMPLETED, se valida en la vista) */
    addReview(request: CreateReviewRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.reputationApi
            .createReview(request)
            .pipe(retry(2))
            .subscribe({
                next: (created) => {
                    this.reviewsSignal.update((reviews) => [...reviews, created]);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo crear la reseña'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /**
     * Tutor responde una reseña. El backend no tiene un endpoint de "solo reply":
     * reenviamos rating+comment (sin cambiarlos) junto con el nuevo tutorReply,
     * porque el PUT reemplaza los tres campos a la vez.
     */
    replyToReview(reviewId: number, reply: string): void {
        const review = this.reviews().find((r) => r.id === reviewId);
        if (!review) return;

        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.reputationApi
            .replyToReview(reviewId, {
                rating: review.rating,
                comment: review.comment,
                tutorReply: reply,
            })
            .pipe(retry(2))
            .subscribe({
                next: (updated) => {
                    this.reviewsSignal.update((reviews) =>
                        reviews.map((r) => (r.id === updated.id ? updated : r)),
                    );
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo responder la reseña'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private loadReviews(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.reputationApi
            .getReviews()
            .subscribe({
                next: (reviews) => {
                    this.reviewsSignal.set(reviews);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar las reseñas'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}
