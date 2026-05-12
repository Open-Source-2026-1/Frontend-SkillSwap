import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ModerationStoreService } from '../../../application/moderation-store.service';
import { Report } from '../../../domain/model/report.entity';

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {
  private fb      = inject(FormBuilder);
  readonly router = inject(Router);
  private route   = inject(ActivatedRoute);
  private store   = inject(ModerationStoreService);

  statusOptions = [
    { value: 'pending',   label: 'reports.status-pending'   },
    { value: 'warning',   label: 'reports.status-warning'   },
    { value: 'dismissed', label: 'reports.status-dismissed' },
  ];

  isEdit   = false;
  reportId: number | null = null;
  private originalClosed: boolean = false;

  form = this.fb.group({
    reporterUserId: new FormControl<number>(0,         { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    reportedUserId: new FormControl<number>(0,         { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    reason:         new FormControl<string>('',        { nonNullable: true, validators: [Validators.required] }),
    status:         new FormControl<string>('pending', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    this.route.params.subscribe(params => {
      this.reportId = params['id'] ? +params['id'] : null;
      this.isEdit   = !!this.reportId;
      if (this.isEdit) {
        const report: Report | undefined = this.store.getReportById(this.reportId)();
        if (report) {
          this.originalClosed = report.closed ?? false;
          this.form.patchValue({
            reporterUserId: report.reporterUserId,
            reportedUserId: report.reportedUserId,
            reason:         report.reason,
            status:         report.status,
          });
        }
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const report = new Report({
      id:             this.reportId ?? 0,
      reporterUserId: this.form.value.reporterUserId!,
      reportedUserId: this.form.value.reportedUserId!,
      reason:         this.form.value.reason!,
      status:         this.form.value.status!,
      closed:         this.originalClosed,
      createdAt:      new Date().toISOString(),
    });
    if (this.isEdit) { this.store.updateReport(report); }
    else             { this.store.addReport(report); }
    this.router.navigate(['moderation/reports']);
  }
}
