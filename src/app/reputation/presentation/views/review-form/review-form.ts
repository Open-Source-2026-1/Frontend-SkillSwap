import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReputationStore } from '../../../application/reputation-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CURRENT_LEARNER_ID, CURRENT_FULL_NAME } from '../../../../shared/infrastructure/current-user';


@Component({
    selector: 'app-review-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './review-form.html',
    styleUrl: './review-form.css',
})
export class ReviewForm {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private store = inject(ReputationStore);

    private readonly tutorId: number = +(this.route.snapshot.queryParamMap.get('tutorId') ?? 0);
    private readonly sessionId: number = +(this.route.snapshot.queryParamMap.get('sessionId') ?? 0);

    readonly hoveredStar = signal<number>(0);
    readonly selectedStar = signal<number>(0);
    readonly tutorName: string =
        this.route.snapshot.queryParamMap.get('tutorName') ?? 'el tutor';

    readonly ratingOptions = [1, 2, 3, 4, 5];

    /** El backend no tiene GET /reviews/session/{id}: la validación es en cliente. */
    readonly alreadyReviewed = computed(() => this.store.hasReviewForSession(this.sessionId));

    form = this.fb.group({
        learnerName: new FormControl<string>(CURRENT_FULL_NAME(), {
            nonNullable: true,
            validators: [Validators.required],
        }),
        rating: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)],
        }),
        comment: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(10)],
        }),
    });

    setStar(star: number): void {
        this.selectedStar.set(star);
        this.form.patchValue({ rating: star });
    }

    hoverStar(star: number): void {
        this.hoveredStar.set(star);
    }

    clearHover(): void {
        this.hoveredStar.set(0);
    }

    starClass(star: number): string {
        const active = this.hoveredStar() || this.selectedStar();
        return star <= active ? 'star-filled' : '';
    }

    submit(): void {
        if (this.form.invalid || this.selectedStar() === 0 || this.alreadyReviewed()) return;

        this.store.addReview({
            tutorId: this.tutorId,
            learnerId: CURRENT_LEARNER_ID(),
            learnerName: this.form.value.learnerName!,
            rating: this.form.value.rating!,
            comment: this.form.value.comment!,
            sessionId: this.sessionId,
        });
        this.goBack();
    }

    goBack(): void {
        this.router.navigate(['workspace/tutoring-sessions']).then();
    }
}
