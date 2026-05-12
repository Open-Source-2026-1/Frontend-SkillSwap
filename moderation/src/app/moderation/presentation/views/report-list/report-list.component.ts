import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ModerationStoreService } from '../../../application/moderation-store.service';
import { Report } from '../../../domain/model/report.entity';

@Component({
  selector: 'app-report-list',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule, MatIconModule, TranslateModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  readonly store  = inject(ModerationStoreService);
  readonly router = inject(Router);
  displayedColumns = ['id', 'reporterUserId', 'reportedUserId', 'reason', 'status', 'createdAt', 'actions'];

  readonly activeReports   = this.store.activeReports;
  readonly resolvedReports = this.store.resolvedReports;
  readonly pendingCount    = computed(() =>
    this.store.activeReports().filter(r => r.status === 'pending').length
  );

  resolveReport(report: Report): void {
    const updated = new Report({
      id:             report.id,
      reporterUserId: report.reporterUserId,
      reportedUserId: report.reportedUserId,
      reason:         report.reason,
      status:         report.status === 'pending' ? 'warning' : report.status,
      closed:         true,
      createdAt:      report.createdAt.toISOString(),
    });
    this.store.updateReport(updated);
  }

  openChat(userId: number): void {
    this.router.navigate(['moderation/reports/chat', userId]);
  }
}
