import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Tutor } from '../domain/model/tutor.entity';
import { Favorite } from '../domain/model/favorite.entity';
import { CreateTutorRequest } from '../domain/model/create-tutor.request';
import { UpdateTutorRequest } from '../domain/model/update-tutor.request';
import { DiscoveryApi } from '../infrastructure/discovery-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRENT_LEARNER_ID, isSignedIn } from '../../shared/infrastructure/current-user';

@Injectable({
    providedIn: 'root',
})
export class DiscoveryStore {
    private readonly tutorsSignal = signal<Tutor[]>([]);
    private readonly favoritesSignal = signal<Favorite[]>([]);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);

    /** US06 — filtros reactivos */
    private readonly searchQuerySignal = signal<string>('');
    private readonly selectedUniversitySignal = signal<string>('all');
    private readonly minRatingSignal = signal<number>(0);
    private readonly availableOnlySignal = signal<boolean>(false);

    readonly availableOnly = this.availableOnlySignal.asReadonly();
    readonly tutors = this.tutorsSignal.asReadonly();
    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();
    readonly searchQuery = this.searchQuerySignal.asReadonly();
    readonly selectedUniversity = this.selectedUniversitySignal.asReadonly();
    readonly minRating = this.minRatingSignal.asReadonly();

    readonly tutorCount = computed(() => this.tutors().length);

    /** US_favoritos — tutores marcados como favoritos por el learner actual */
    readonly favoriteTutors = computed(() => {
        const favoriteTutorIds = new Set(this.favoritesSignal().map((f) => f.tutorId));
        return this.tutors().filter((t) => favoriteTutorIds.has(t.id));
    });

    /** Lista de universidades únicas para el filtro */
    readonly universities = computed(() => {
        const uniq = [...new Set(this.tutors().map((t) => t.university))].sort();
        return uniq;
    });


    readonly filteredTutors = computed(() => {
        const q = this.searchQuerySignal().toLowerCase().trim();
        const uni = this.selectedUniversitySignal();
        const minR = this.minRatingSignal();
        const onlyAvailable = this.availableOnlySignal();

        return this.tutors().filter((t) => {
            const matchesQuery =
                !q ||
                t.name.toLowerCase().includes(q) ||
                t.university.toLowerCase().includes(q) ||
                t.skills.some((s) => s.toLowerCase().includes(q));
            const matchesUniversity = uni === 'all' || t.university === uni;
            const matchesRating = t.rating >= minR;
            const matchesAvailability = !onlyAvailable || t.available;
            return matchesQuery && matchesUniversity && matchesRating && matchesAvailability;
        });
    });

    constructor(private discoveryApi: DiscoveryApi) {
        this.loadTutors();
        if (isSignedIn()) {
            this.loadFavorites();
        }
    }

    getTutorById(id: number | null | undefined): Signal<Tutor | undefined> {
        return computed(() => (id ? this.tutors().find((t) => t.id === id) : undefined));
    }

    /** US05 — búsqueda por keyword */
    setSearchQuery(query: string): void {
        this.searchQuerySignal.set(query);
    }

    /** US06 — filtro por universidad */
    setUniversityFilter(university: string): void {
        this.selectedUniversitySignal.set(university);
    }

    /** US06 — filtro por rating mínimo */
    setMinRating(rating: number): void {
        this.minRatingSignal.set(rating);
    }

    setAvailableOnly(value: boolean): void {
        this.availableOnlySignal.set(value);
    }

    clearFilters(): void {
        this.searchQuerySignal.set('');
        this.selectedUniversitySignal.set('all');
        this.minRatingSignal.set(0);
        this.availableOnlySignal.set(false);
    }

    private loadTutors(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.discoveryApi
            .getTutors()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (tutors) => {
                    this.tutorsSignal.set(tutors);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar los tutores'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private loadFavorites(): void {
        this.discoveryApi
            .getFavoritesByLearner(CURRENT_LEARNER_ID())
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (favorites) => this.favoritesSignal.set(favorites),
                error: (err) =>
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar tus favoritos')),
            });
    }

    isFavorite(tutorId: number): boolean {
        return this.favoritesSignal().some((f) => f.tutorId === tutorId);
    }


    /** US_IAM — crea el perfil de tutor tras el sign-up con ROLE_TUTOR. */
    createTutor(request: CreateTutorRequest): Observable<Tutor> {
        return this.discoveryApi.createTutor(request).pipe(
            tap((created) => {
                this.tutorsSignal.update((tutors) => [...tutors, created]);
            }),
        );
    }

    /** US_IAM — editar mi propio perfil de tutor (requiere ser el dueño, lo valida el backend). */
    updateTutor(tutorId: number, request: UpdateTutorRequest): Observable<Tutor> {
        return this.discoveryApi.updateTutor(tutorId, request).pipe(
            tap((updated) => {
                this.tutorsSignal.update((tutors) =>
                    tutors.map((t) => (t.id === updated.id ? updated : t)),
                );
            }),
        );
    }


    getTutorByUserId(userId: number): Observable<Tutor | null> {
        return this.discoveryApi.getTutorByUserId(userId);
    }


    toggleFavorite(tutorId: number): void {
        if (this.isFavorite(tutorId)) {
            this.discoveryApi.removeFavorite(CURRENT_LEARNER_ID(), tutorId).subscribe({
                next: () => {
                    this.favoritesSignal.update((favs) => favs.filter((f) => f.tutorId !== tutorId));
                },
                error: (err) =>
                    this.errorSignal.set(this.formatError(err, 'No se pudo quitar de favoritos')),
            });
        } else {
            this.discoveryApi.addFavorite({ learnerId: CURRENT_LEARNER_ID(), tutorId }).subscribe({
                next: (created) => {
                    this.favoritesSignal.update((favs) => [...favs, created]);
                },
                error: (err) =>
                    this.errorSignal.set(this.formatError(err, 'No se pudo marcar como favorito')),
            });
        }
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}
