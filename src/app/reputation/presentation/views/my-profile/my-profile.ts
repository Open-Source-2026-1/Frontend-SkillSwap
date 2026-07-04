import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReputationStore } from '../../../application/reputation-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SlicePipe, DatePipe } from '@angular/common';
import { CURRENT_TUTOR_ID } from '../../../../shared/infrastructure/current-user';

@Component({
    selector: 'app-my-profile',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinner, SlicePipe, DatePipe],
    templateUrl: './my-profile.html',
    styleUrl: './my-profile.css',
})
export class MyProfile {
    private router = inject(Router);
    readonly store = inject(ReputationStore);
    readonly discoveryStore = inject(DiscoveryStore);

    /** Perfil real del tutor actual, traído de Discovery */
    readonly currentTutor = this.discoveryStore.getTutorById(CURRENT_TUTOR_ID());

    navigateToEditProfile(): void {
        this.router.navigate(['/discovery/edit-profile']).then();
    }

    /** Signal para saber qué reseña está en modo reply */
    readonly replyingReviewId = signal<number | null>(null);
    readonly replyText = signal<string>('');

    openReply(reviewId: number): void {
        this.replyingReviewId.set(reviewId);
        this.replyText.set('');
    }

    cancelReply(): void {
        this.replyingReviewId.set(null);
        this.replyText.set('');
    }

    submitReply(reviewId: number): void {
        if (!this.replyText().trim()) return;
        this.store.replyToReview(reviewId, this.replyText().trim());
        this.replyingReviewId.set(null);
        this.replyText.set('');
    }

    onReplyInput(event: Event): void {
        this.replyText.set((event.target as HTMLTextAreaElement).value);
    }

    stars(rating: number): number[] {
        return Array.from({ length: 5 }, (_, i) => i + 1);
    }

    isStarFilled(star: number, rating: number): boolean {
        return star <= Math.round(rating);
    }
}
