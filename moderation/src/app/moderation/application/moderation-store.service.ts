import { Injectable, inject, computed, signal, Signal } from '@angular/core';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModerationApiService } from '../infrastructure/moderation-api.service';
import { Report } from '../domain/model/report.entity';
import { Sanction } from '../domain/model/sanction.entity';

@Injectable({ providedIn: 'root' })
export class ModerationStoreService {
  private readonly api = inject(ModerationApiService);

  // ── Signals ──────────────────────────────────────────────────────────────
  private readonly reportsSignal   = signal<Report[]>([]);
  private readonly sanctionsSignal = signal<Sanction[]>([]);
  private readonly loadingSignal   = signal<boolean>(false);
  private readonly errorSignal     = signal<string | null>(null);

  readonly reports   = this.reportsSignal.asReadonly();
  readonly sanctions = this.sanctionsSignal.asReadonly();
  readonly loading   = this.loadingSignal.asReadonly();
  readonly error     = this.errorSignal.asReadonly();

  // ── Computed — igual que el profe, TODOS en el store ─────────────────────
  readonly reportCount    = computed(() => this.reportsSignal().length);
  readonly sanctionCount  = computed(() => this.sanctionsSignal().length);
  readonly pendingReports = computed(() => this.reportsSignal().filter(r => r.isPending()));

  /**
   * Reports that are still active (not yet resolved by admin).
   */
  readonly activeReports = computed(() =>
    this.reportsSignal().filter(r => !r.closed)
  );

  /**
   * Reports that have been resolved by admin.
   */
  readonly resolvedReports = computed(() =>
    this.reportsSignal().filter(r => r.closed)
  );

  constructor() {
    this.loadReports();
    this.loadSanctions();
  }

  /**
   * Retrieves a report by its ID as a signal.
   * @param id - The ID of the report.
   * @returns A Signal containing the Report object or undefined if not found.
   */
  getReportById(id: number | null | undefined): Signal<Report | undefined> {
    return computed(() => id ? this.reportsSignal().find(r => r.id === id) : undefined);
  }

  // ── CRUD Report ───────────────────────────────────────────────────────────
  addReport(report: Report): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.createReport(report).pipe(retry(2)).subscribe({
      next: created => { this.reportsSignal.update(items => [...items, created]); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.formatError(err, 'Failed to create report')); this.loadingSignal.set(false); }
    });
  }

  updateReport(updated: Report): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.updateReport(updated).pipe(retry(2)).subscribe({
      next: item => { this.reportsSignal.update(items => items.map(i => i.id === item.id ? item : i)); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.formatError(err, 'Failed to update report')); this.loadingSignal.set(false); }
    });
  }

  deleteReport(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.deleteReport(id).pipe(retry(2)).subscribe({
      next: ()  => { this.reportsSignal.update(items => items.filter(i => i.id !== id)); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.formatError(err, 'Failed to delete report')); this.loadingSignal.set(false); }
    });
  }

  // ── CRUD Sanction ─────────────────────────────────────────────────────────
  addSanction(sanction: Sanction): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.createSanction(sanction).pipe(retry(2)).subscribe({
      next: created => { this.sanctionsSignal.update(items => [...items, created]); this.loadingSignal.set(false); },
      error: err    => { this.errorSignal.set(this.formatError(err, 'Failed to create sanction')); this.loadingSignal.set(false); }
    });
  }

  updateSanction(updated: Sanction): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.updateSanction(updated).pipe(retry(2)).subscribe({
      next: item => { this.sanctionsSignal.update(items => items.map(i => i.id === item.id ? item : i)); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.formatError(err, 'Failed to update sanction')); this.loadingSignal.set(false); }
    });
  }

  deleteSanction(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.deleteSanction(id).pipe(retry(2)).subscribe({
      next: ()  => { this.sanctionsSignal.update(items => items.filter(i => i.id !== id)); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.formatError(err, 'Failed to delete sanction')); this.loadingSignal.set(false); }
    });
  }

  // ── Private loaders ───────────────────────────────────────────────────────
  private loadReports(): void {
    this.loadingSignal.set(true);
    this.api.getReports().pipe(takeUntilDestroyed()).subscribe({
      next:  items => { this.reportsSignal.set(items);   this.loadingSignal.set(false); },
      error: err   => { this.errorSignal.set(this.formatError(err, 'Failed to load reports')); this.loadingSignal.set(false); }
    });
  }

  private loadSanctions(): void {
    this.loadingSignal.set(true);
    this.api.getSanctions().pipe(takeUntilDestroyed()).subscribe({
      next:  items => { this.sanctionsSignal.set(items); this.loadingSignal.set(false); },
      error: err   => { this.errorSignal.set(this.formatError(err, 'Failed to load sanctions')); this.loadingSignal.set(false); }
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) return error.message;
    return fallback;
  }
}
