import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModerationStore } from '../../../../moderation/application/moderation-store';
import { WorkspaceStore } from '../../../../workspace/application/workspace-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { ReputationStore } from '../../../../reputation/application/reputation-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SlicePipe, DatePipe  } from '@angular/common';

@Component({
    selector: 'app-coordinator',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinner, SlicePipe, DatePipe],
    templateUrl: './coordinator.html',
    styleUrl: './coordinator.css',
})
export class Coordinator {
    private router = inject(Router);
    readonly moderationStore = inject(ModerationStore);
    readonly workspaceStore = inject(WorkspaceStore);
    readonly discoveryStore = inject(DiscoveryStore);

    readonly searchName = signal<string>('');
    readonly searchCode = signal<string>('');
    readonly searchDone = signal<boolean>(false);
    readonly reputationStore = inject(ReputationStore);
    readonly showGuide = signal<boolean>(false);

    /** Mock estudiantes para la búsqueda */
     readonly mockStudents = [
        { id: 101, name: 'Valeria Torres', code: 'u201924127', university: 'UPC', avatar: 'https://i.pravatar.cc/150?img=47' },
        { id: 102, name: 'Jazmín Rosas', code: 'u202016635', university: 'PUCP', avatar: 'https://i.pravatar.cc/150?img=25' },
        { id: 103, name: 'Luis Becerra', code: 'u20231C792', university: 'UPC', avatar: 'https://i.pravatar.cc/150?img=33' },
        { id: 104, name: 'Rafael Pacheco', code: 'u202014215', university: 'UNI', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: 108, name: 'Santiago Vargas', code: 'u202416706', university: 'UP', avatar: 'https://i.pravatar.cc/150?img=51' },
    ];

    readonly searchResults = computed(() => {
        if (!this.searchDone()) return [];
        const name = this.searchName().toLowerCase().trim();
        const code = this.searchCode().toLowerCase().trim();
        if (!name && !code) return this.mockStudents;
        return this.mockStudents.filter((s) =>
            (!name || s.name.toLowerCase().includes(name)) &&
            (!code || s.code.toLowerCase().includes(code)),
        );
    });

    /** Stats generales */
    readonly stats = computed(() => {
        const sessions = this.workspaceStore.tutoringSessions();
        return {
            totalSessions: sessions.length,
            pending: sessions.filter((s) => s.status === 'PENDING').length,
            completed: sessions.filter((s) => s.status === 'COMPLETED').length,
            pendingReports: this.moderationStore.pendingCount(),
            resolvedReports: this.moderationStore.resolvedReports().length,
            totalTutors: this.discoveryStore.tutors().length,
        };
    });

    /** Sesiones del estudiante seleccionado */
    readonly studentSessions = computed(() => {
        const s = this.selectedStudent();
        if (!s) return [];
        return this.workspaceStore
            .tutoringSessions()
            .filter((session) =>
                session.learnerId === s.id || session.tutorId === s.id,
            );
    });

    /** Reportes del estudiante seleccionado */
    readonly studentReports = computed(() => {
        const s = this.selectedStudent();
        if (!s) return [];
        return this.moderationStore
            .reports()
            .filter((r) =>
                r.reporterUserId === s.id || r.reportedUserId === s.id,
            );
    });

    /** Reseñas del estudiante seleccionado */
    readonly studentReviews = computed(() => {
        const s = this.selectedStudent();
        if (!s) return [];
        return this.reputationStore
            .reviews()
            .filter((r) => r.tutorId === s.id || r.learnerId === s.id);
    });

    openHistoryModal(student: {
        id: number;
        name: string;
        code: string;
        university: string;
        avatar: string;
    }): void {
        this.selectedStudent.set(student);
        this.historyTab.set('sessions');
        this.showHistoryModal.set(true);
    }

    closeHistoryModal(): void {
        this.showHistoryModal.set(false);
        this.selectedStudent.set(null);
    }

    setHistoryTab(tab: 'sessions' | 'reports' | 'reviews'): void {
        this.historyTab.set(tab);
    }

    readonly showHistoryModal = signal<boolean>(false);
    readonly selectedStudent = signal<{
        id: number;
        name: string;
        code: string;
        university: string;
        avatar: string;
    } | null>(null);

    readonly historyTab = signal<'sessions' | 'reports' | 'reviews'>('sessions');

    onSearchName(event: Event): void {
        this.searchName.set((event.target as HTMLInputElement).value);
        this.searchDone.set(false);
    }

    onSearchCode(event: Event): void {
        this.searchCode.set((event.target as HTMLInputElement).value);
        this.searchDone.set(false);
    }

    search(): void {
        this.searchDone.set(true);
    }

    clearSearch(): void {
        this.searchName.set('');
        this.searchCode.set('');
        this.searchDone.set(false);
    }


    resolveReporterName(userId: number): string {
        const tutor = this.discoveryStore.tutors().find((t) => t.id === userId);
        return tutor ? tutor.name : `Usuario #${userId}`;
    }

    resolveReport(event: Event, id: number): void {
        event.stopPropagation();
        this.moderationStore.resolveReport(id);
    }

    goToModeration(): void {
        this.router.navigate(['/moderation/panel']).then();
    }

    goToQuizzes(): void {
        this.router.navigate(['/learning/admin']).then();
    }

    goHome(): void {
        this.router.navigate(['/home']).then();
    }

    statusLabel(status: string): string {
        const map: Record<string, string> = {
            PENDING: 'Pendiente', SCHEDULED: 'Confirmada',
            COMPLETED: 'Completada', REJECTED: 'Rechazada', CANCELLED: 'Cancelada',
        };
        return map[status] ?? status;
    }

    statusClass(status: string): string {
        const map: Record<string, string> = {
            PENDING: 'chip-pending', SCHEDULED: 'chip-scheduled',
            COMPLETED: 'chip-completed', REJECTED: 'chip-rejected', CANCELLED: 'chip-cancelled',
        };
        return map[status] ?? '';
    }

    getTutorSessionCount(tutorId: number): number {
        return this.workspaceStore
            .tutoringSessions()
            .filter((s) => s.tutorId === tutorId && s.status === 'COMPLETED').length;
    }

    getTutorReviewCount(tutorId: number): number {
        return this.reputationStore.reviews().filter((r) => r.tutorId === tutorId).length;
    }

    getTutorAverageRating(tutorId: number): number {
        const reviews = this.reputationStore.reviews().filter((r) => r.tutorId === tutorId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }
    toggleGuide(): void {
        this.showGuide.update((v) => !v);
    }

}