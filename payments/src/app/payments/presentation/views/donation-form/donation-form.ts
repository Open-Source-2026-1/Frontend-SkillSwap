import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsStore } from '../../../application/payments-store';
import { Donation } from '../../../domain/model/donation.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-donation-form',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './donation-form.html',
  styleUrl: './donation-form.css',
})
export class DonationForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  protected router = inject(Router);
  private store = inject(PaymentsStore);

  private readonly COMMISSION_RATE = 0.05;

  form = this.fb.group({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    stripeTransactionId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tutorId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    sessionId: new FormControl<number | null>(null, { validators: [Validators.required] }),
  });

  isEdit = false;
  donationId: number | null = null;

  get commissionPreview(): number {
    const amount = this.form.value.amount ?? 0;
    return +(amount * this.COMMISSION_RATE).toFixed(2);
  }

  get netAmountPreview(): number {
    const amount = this.form.value.amount ?? 0;
    return +(amount - this.commissionPreview).toFixed(2);
  }

  constructor() {
    this.route.params.subscribe((params) => {
      this.donationId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.donationId;
      if (this.isEdit) {
        const donation = this.store.donations().find((d) => d.id === this.donationId);
        if (donation) {
          this.form.patchValue({
            amount: donation.amount,
            stripeTransactionId: donation.stripeTransactionId,
            tutorId: donation.tutorId,
            sessionId: donation.sessionId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const amount = this.form.value.amount!;
    const commissionFee = +(amount * this.COMMISSION_RATE).toFixed(2);
    const netAmount = +(amount - commissionFee).toFixed(2);

    const donation: Donation = new Donation({
      id: this.donationId ?? 0,
      amount,
      commissionFee,
      netAmount,
      stripeTransactionId: this.form.value.stripeTransactionId!,
      tutorId: this.form.value.tutorId!,
      sessionId: this.form.value.sessionId!,
    });

    if (this.isEdit) {
      this.store.updateDonation(donation);
    } else {
      this.store.addDonation(donation);
    }

    this.router.navigate(['payments/donations']).then();
  }
}
