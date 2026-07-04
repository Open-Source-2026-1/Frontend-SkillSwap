import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscoveryStore } from '../../../application/discovery-store';
import { WorkspaceStore } from '../../../../workspace/application/workspace-store';
import { ReputationStore } from '../../../../reputation/application/reputation-store';
import { PaymentsStore } from '../../../../payments/application/payments-store';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SlicePipe } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-tutor-detail',
    imports: [
        MatButtonModule, MatIconModule, MatProgressSpinner,
        MatError, ReactiveFormsModule,SlicePipe,
    ],
    templateUrl: './tutor-detail.html',
    styleUrl: './tutor-detail.css',
})
export class TutorDetail {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    readonly store = inject(DiscoveryStore);
    private workspaceStore = inject(WorkspaceStore);
    readonly paymentsStore = inject(PaymentsStore);
    readonly reputationStore = inject(ReputationStore);

    private readonly tutorId = toSignal(
        this.route.params.pipe(map((p) => +p['id'])),
        { initialValue: 0 },
    );

    readonly tutor = computed(() =>
        this.store.tutors().find((t) => t.id === this.tutorId()),
    );

    /** Sesiones completadas con este tutor */
    readonly tutorSessionCount = computed(() => {
        const t = this.tutor();
        if (!t) return 0;
        return this.workspaceStore
            .tutoringSessions()
            .filter((s) => s.tutorId === t.id && s.status === 'COMPLETED').length;
    });

    /** Reseñas recibidas por este tutor */
    readonly tutorReviews = computed(() => {
        const t = this.tutor();
        if (!t) return [];
        return this.reputationStore.reviews().filter((r) => r.tutorId === t.id);
    });

    /** Rating promedio calculado desde las reseñas */
    readonly tutorAverageRating = computed(() => {
        const reviews = this.tutorReviews();
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    });

    /** Sesiones pendientes o agendadas activas */
    readonly tutorActiveSessions = computed(() => {
        const t = this.tutor();
        if (!t) return 0;
        return this.workspaceStore
            .tutoringSessions()
            .filter((s) => s.tutorId === t.id &&
                (s.status === 'PENDING' || s.status === 'SCHEDULED')).length;
    });

    readonly levelOptions = [
        { value: 'basico', label: '🟢 Básico — recién empiezo el tema' },
        { value: 'intermedio', label: '🟡 Intermedio — tengo base pero tengo dudas' },
        { value: 'avanzado', label: '🔴 Avanzado — necesito profundizar' },
    ];


    /** Modal de solicitud */
    readonly showModal = signal<boolean>(false);
    readonly requestSent = signal<boolean>(false);

    requestForm = this.fb.group({
        topic: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        scheduledAt: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        studentLevel: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        message: new FormControl<string>('', {
            nonNullable: true,
        }),
    });



    openModal(): void {
        const t = this.tutor();
        if (!t || !t.available) return;
        this.requestForm.reset();
        this.requestSent.set(false);
        this.showModal.set(true);
    }

    closeModal(): void {
        this.showModal.set(false);
        this.requestSent.set(false);
    }

    /** US08 — envía la solicitud de tutoría */
    submitRequest(): void {
        if (this.requestForm.invalid) return;
        const t = this.tutor();
        if (!t) return;

        this.workspaceStore.requestTutoringSession({
            learnerId: CURRENT_LEARNER_ID(),
            tutorId: t.id,
            topic: this.requestForm.value.topic!,
            message: this.requestForm.value.message ?? '',
            studentLevel: this.requestForm.value.studentLevel!,
            scheduledAt: this.requestForm.value.scheduledAt!,
        });
        this.requestSent.set(true);
    }

    goToSessions(): void {
        this.router.navigate(['workspace/tutoring-sessions']).then();
        this.closeModal();
    }

    donate(): void {
        const t = this.tutor();
        if (!t) return;
        this.router.navigate(['payments/donate'], {
            queryParams: { tutorId: t.id, tutorName: t.name, sessionId: 0 },
        }).then();
    }

    stars(rating: number): number[] {
        return Array.from({ length: 5 }, (_, i) => i + 1);
    }

    isStarFilled(star: number, rating: number): boolean {
        return star <= Math.round(rating);
    }

    goBack(): void {
        this.router.navigate(['discovery/tutors']).then();
    }
    openPortfolio(url: string): void {
        window.open(url, '_blank');
    }
}