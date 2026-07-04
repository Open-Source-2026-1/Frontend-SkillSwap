import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DiscoveryStore } from '../../../application/discovery-store';
import { ReputationStore } from '../../../../reputation/application/reputation-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';

@Component({
    selector: 'app-tutor-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinner,
        MatError,
    ],
    templateUrl: './tutor-list.html',
    styleUrl: './tutor-list.css',
})
export class TutorList {
    readonly store = inject(DiscoveryStore);
    readonly reputationStore = inject(ReputationStore);
    protected router = inject(Router);

    readonly ratingOptions = [
        { value: 0, label: 'Todos' },
        { value: 3, label: '3+ estrellas' },
        { value: 4, label: '4+ estrellas' },
        { value: 4.5, label: '4.5+ estrellas' },
    ];

    onSearch(event: Event): void {
        this.store.setSearchQuery((event.target as HTMLInputElement).value);
    }

    onUniversityChange(value: string): void {
        this.store.setUniversityFilter(value);
    }

    onRatingChange(value: number): void {
        this.store.setMinRating(value);
    }

    clearFilters(): void {
        this.store.clearFilters();
    }

    viewTutor(id: number): void {
        this.router.navigate(['discovery/tutors', id]).then();
    }

    /** Rating real calculado desde las reseñas del tutor (ya no el campo estático de Discovery) */
    averageRating(tutorId: number): number {
        return this.reputationStore.getAverageRatingByTutor(tutorId)();
    }

    reviewCount(tutorId: number): number {
        return this.reputationStore.getReviewsByTutor(tutorId)().length;
    }

    stars(rating: number): number[] {
        return Array.from({ length: 5 }, (_, i) => i + 1);
    }

    isStarFilled(star: number, rating: number): boolean {
        return star <= Math.round(rating);
    }
    onAvailableOnlyChange(value: boolean): void {
        this.store.setAvailableOnly(value);
    }
}