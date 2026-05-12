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
import { Sanction } from '../../../domain/model/sanction.entity';

@Component({
  selector: 'app-sanction-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './sanction-form.component.html',
  styleUrl: './sanction-form.component.css'
})
export class SanctionFormComponent {
  private fb      = inject(FormBuilder);
  readonly router = inject(Router);
  private route   = inject(ActivatedRoute);
  private store   = inject(ModerationStoreService);

  typeOptions = ['ban', 'warning', 'dismissed'];
  isEdit      = false;
  sanctionId: number | null = null;

  form = this.fb.group({
    reportId:         new FormControl<number>(0,         { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    sanctionedUserId: new FormControl<number>(0,         { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    type:             new FormControl<string>('warning', { nonNullable: true, validators: [Validators.required] }),
    description:      new FormControl<string>('',        { nonNullable: true, validators: [Validators.required] }),
    durationDays:     new FormControl<number>(0,         { nonNullable: true }),
  });

  constructor() {
    this.route.params.subscribe(params => {
      this.sanctionId = params['id'] ? +params['id'] : null;
      this.isEdit     = !!this.sanctionId;
      if (this.isEdit) {
        const s: Sanction | undefined = this.store.sanctions().find((x: Sanction) => x.id === this.sanctionId);
        if (s) { this.form.patchValue({ reportId: s.reportId, sanctionedUserId: s.sanctionedUserId, type: s.type, description: s.description, durationDays: s.durationDays }); }
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const sanction = new Sanction({ id: this.sanctionId ?? 0, reportId: this.form.value.reportId!, sanctionedUserId: this.form.value.sanctionedUserId!, type: this.form.value.type!, description: this.form.value.description!, durationDays: this.form.value.durationDays ?? 0, createdAt: new Date().toISOString() });
    if (this.isEdit) { this.store.updateSanction(sanction); } else { this.store.addSanction(sanction); }
    this.router.navigate(['moderation/sanctions']);
  }
}
