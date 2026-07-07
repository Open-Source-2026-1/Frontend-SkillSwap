import {
    isQuizMessage,
    isQuizResultMessage,
    parseQuizMessage,
    parseQuizResultMessage,
} from '../../../../shared/infrastructure/chat-quiz-message';
import { isFileMessage, parseFileMessage } from '../../../../shared/infrastructure/chat-file-message';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModerationStore } from '../../../application/moderation-store';
import { WorkspaceStore } from '../../../../workspace/application/workspace-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { IamStore } from '../../../../iam/application/iam-store';
import { SanctionType } from '../../../domain/model/sanction.entity';
import { Report } from '../../../domain/model/report.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-moderation-panel',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinner, DatePipe],
    templateUrl: './moderation-panel.html',
    styleUrl: './moderation-panel.css',
})
export class ModerationPanel {
    readonly store = inject(ModerationStore);
    readonly workspaceStore = inject(WorkspaceStore);
    readonly discoveryStore = inject(DiscoveryStore);
    readonly iamStore = inject(IamStore);
    protected router = inject(Router);

    readonly activeTab = signal<'pending' | 'resolved' | 'sanctions'>('pending');

    /** Modal de chat */
    readonly showChatModal = signal<boolean>(false);
    readonly selectedReport = signal<Report | null>(null);
    readonly showSanctionModal = signal<boolean>(false);
    readonly reportToSanction = signal<Report | null>(null);
    readonly selectedSanctionType = signal<SanctionType>('warning');

    /** Mensajes de la sesión del reporte seleccionado */
    readonly sessionMessages = computed(() => {
        const report = this.selectedReport();
        if (!report) return [];
        return this.workspaceStore
            .messages()
            .filter((m) => m.sessionId === report.sessionId);
    });

    /** Verifica si el tutor participó en el chat */
    readonly tutorParticipated = computed(() => {
        const report = this.selectedReport();
        if (!report) return false;
        const session = this.workspaceStore
            .tutoringSessions()
            .find((s) => s.id === report.sessionId);
        if (!session) return false;
        return this.sessionMessages().some((m) => m.senderId === session.tutorId);
    });

    /** Verifica si el aprendiz participó en el chat */
    readonly learnerParticipated = computed(() => {
        const report = this.selectedReport();
        if (!report) return false;
        const session = this.workspaceStore
            .tutoringSessions()
            .find((s) => s.id === report.sessionId);
        if (!session) return false;
        return this.sessionMessages().some((m) => m.senderId === session.learnerId);
    });

    /** Sesión del reporte seleccionado */
    readonly selectedSession = computed(() => {
        const report = this.selectedReport();
        if (!report) return null;
        return this.workspaceStore
            .tutoringSessions()
            .find((s) => s.id === report.sessionId) ?? null;
    });

    readonly sanctionOptions: { type: SanctionType; label: string; desc: string; color: string; icon: string }[] = [
        {
            type: 'warning',
            label: 'Advertencia',
            desc: 'Notificación formal. No restringe el acceso.',
            color: '#f57f17',
            icon: 'warning',
        },
        {
            type: 'block',
            label: 'Bloqueo temporal',
            desc: 'Restringe el acceso por 7 días.',
            color: '#e65100',
            icon: 'block',
        },
        {
            type: 'suspension',
            label: 'Suspensión',
            desc: 'Suspende la cuenta por 30 días.',
            color: '#c62828',
            icon: 'gavel',
        },
    ];

    openSanctionModal(report: Report): void {
        this.reportToSanction.set(report);
        this.selectedSanctionType.set('warning');
        this.showSanctionModal.set(true);
    }

    closeSanctionModal(): void {
        this.showSanctionModal.set(false);
        this.reportToSanction.set(null);
    }

    confirmSanction(): void {
        const report = this.reportToSanction();
        if (!report) return;
        this.store.applySanction(report, this.selectedSanctionType());
        this.closeSanctionModal();
    }

    sanctionTypeClass(type: SanctionType): string {
        const map: Record<SanctionType, string> = {
            warning: 'sanction-warning',
            block: 'sanction-block',
            suspension: 'sanction-suspension',
        };
        return map[type];
    }

    sanctionTypeLabel(type: SanctionType): string {
        const map: Record<SanctionType, string> = {
            warning: 'Advertencia',
            block: 'Bloqueo temporal',
            suspension: 'Suspensión',
        };
        return map[type];
    }


    getSenderName(senderId: number): string {
        const session = this.selectedSession();
        if (!session) return `Usuario #${senderId}`;
        if (senderId === session.tutorId) {
            const tutor = this.discoveryStore.tutors().find((t) => t.id === senderId);
            return tutor ? tutor.name : `Tutor #${senderId}`;
        }
        return this.iamStore.resolveUserName(senderId);
    }

    isQuizMessage = isQuizMessage;
    isQuizResultMessage = isQuizResultMessage;
    isFileMessage = isFileMessage;

    parseFile(content: string) {
        return parseFileMessage(content);
    }

    quizTitleFromMessage(content: string): string {
        return parseQuizMessage(content)?.title ?? '';
    }

    quizResultTextFromMessage(content: string): string {
        return parseQuizResultMessage(content)?.resultText ?? '';
    }

    /** Report.reporterUserId/reportedUserId siempre son User.id (nunca Tutor.id) — se resuelve contra IAM. */
    resolveUserName(userId: number): string {
        return this.iamStore.resolveUserName(userId);
    }

    isTutorMessage(senderId: number): boolean {
        return senderId === this.selectedSession()?.tutorId;
    }

    openChatModal(report: Report): void {
        this.selectedReport.set(report);
        this.showChatModal.set(true);
        // El backend ya no expone un "getAll": pedimos explícitamente la sesión
        // reportada y su historial de chat (puede no estar en cache todavía).
        this.workspaceStore.loadSessionById(report.sessionId);
        this.workspaceStore.loadMessagesForSession(report.sessionId);
    }

    closeChatModal(): void {
        this.showChatModal.set(false);
        this.selectedReport.set(null);
    }

    setTab(tab: 'pending' | 'resolved' | 'sanctions'): void {
        this.activeTab.set(tab);
    }

    resolveReport(event: Event, id: number): void {
        event.stopPropagation();
        this.store.resolveReport(id);
    }

    goBack(): void {
        this.router.navigate(['/coordinator']).then();
    }

    exportToPDF(): void {
        window.print();
    }
}