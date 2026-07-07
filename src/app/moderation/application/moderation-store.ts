import { Injectable } from '@angular/core';
import { computed, effect, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { Report } from '../domain/model/report.entity';
import { Sanction, SanctionType } from '../domain/model/sanction.entity';
import { ModerationApi } from '../infrastructure/moderation-api';
import { CreateReportRequest } from '../domain/model/create-report.request';
import { IamStore } from '../../iam/application/iam-store';
import { retry } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModerationStore {
    private readonly reportsSignal = signal<Report[]>([]);
    private readonly sanctionsSignal = signal<Sanction[]>([]);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);
    private readonly reportSuccessSignal = signal<boolean>(false);

    readonly reports = this.reportsSignal.asReadonly();
    readonly sanctions = this.sanctionsSignal.asReadonly();
    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();
    readonly reportSuccess = this.reportSuccessSignal.asReadonly();

    readonly pendingReports = computed(() =>
        this.reports().filter((r) => r.status === 'pending'),
    );

    readonly resolvedReports = computed(() =>
        this.reports().filter((r) => r.status === 'resolved'),
    );

    readonly pendingCount = computed(() => this.pendingReports().length);

    /** Sanciones por tipo */
    readonly warnings = computed(() =>
        this.sanctions().filter((s) => s.type === 'warning'),
    );

    readonly blocks = computed(() =>
        this.sanctions().filter((s) => s.type === 'block'),
    );

    readonly suspensions = computed(() =>
        this.sanctions().filter((s) => s.type === 'suspension'),
    );

    /** Verifica si un usuario tiene sanción activa */
    isSanctioned(userId: number): boolean {
        return this.sanctions().some((s) => s.sanctionedUserId === userId);
    }

    getSanctionsByUser(userId: number): Sanction[] {
        return this.sanctions().filter((s) => s.sanctionedUserId === userId);
    }

    constructor(
        private moderationApi: ModerationApi,
        private iamStore: IamStore,
    ) {
        effect(() => {
            if (this.iamStore.isSignedIn()) {
                this.loadReports();
                this.loadSanctions();
            } else {
                this.reportsSignal.set([]);
                this.sanctionsSignal.set([]);
            }
        });
    }
    /** US24 — estudiante envía reporte */
    addReport(request: CreateReportRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.reportSuccessSignal.set(false);
        this.moderationApi
            .createReport(request)
            .pipe(retry(2))
            .subscribe({
                next: (created) => {
                    this.reportsSignal.update((reports) => [...reports, created]);
                    this.reportSuccessSignal.set(true);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo enviar el reporte'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /** US25 — moderador resuelve el reporte (PATCH /close, sin body). */
    resolveReport(id: number): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.moderationApi
            .closeReport(id)
            .pipe(retry(2))
            .subscribe({
                next: (r) => {
                    this.reportsSignal.update((reports) =>
                        reports.map((rep) => (rep.id === r.id ? r : rep)),
                    );
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo resolver el reporte'));
                    this.loadingSignal.set(false);
                },
            });
    }


    applySanction(report: Report, type: SanctionType): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const durationDays = this.calculateDurationDays(type);
        const description = `${this.sanctionTypeLabel(type)} aplicada por: ${report.reason}`;

        this.moderationApi
            .createSanction({
                reportId: report.id,
                sanctionedUserId: report.reportedUserId,
                type,
                description,
                durationDays,
            })
            .pipe(
                retry(2),
                switchMap((createdSanction) =>
                    this.moderationApi.closeReport(report.id).pipe(
                        switchMap((closedReport) => {
                            this.sanctionsSignal.update((s) => [...s, createdSanction]);
                            this.reportsSignal.update((reports) =>
                                reports.map((rep) => (rep.id === closedReport.id ? closedReport : rep)),
                            );
                            return [closedReport];
                        }),
                    ),
                ),
            )
            .subscribe({
                next: () => this.loadingSignal.set(false),
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo aplicar la sanción'));
                    this.loadingSignal.set(false);
                },
            });
    }


    private calculateDurationDays(type: SanctionType): number {
        if (type === 'warning') return 0;
        if (type === 'block') return 7;
        return 30; // suspension
    }

    private sanctionTypeLabel(type: SanctionType): string {
        const map: Record<SanctionType, string> = {
            warning: 'Advertencia',
            block: 'Bloqueo temporal',
            suspension: 'Suspensión',
        };
        return map[type];
    }

    private loadReports(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.moderationApi
            .getReports()
            .subscribe({
                next: (reports) => {
                    this.reportsSignal.set(reports);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar los reportes'));
                    this.loadingSignal.set(false);
                },
            });
    }

    private loadSanctions(): void {
        this.moderationApi
            .getSanctions()
            .subscribe({
                next: (sanctions) => {
                    this.sanctionsSignal.set(sanctions);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudieron cargar las sanciones'));
                },
            });
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}