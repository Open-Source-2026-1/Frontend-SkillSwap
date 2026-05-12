import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PaymentsStore } from '../../../application/payments-store';
import { DonationCard } from '../../components/donation-card/donation-card';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-donation-list',
  imports: [MatButtonModule, MatProgressSpinnerModule, MatIconModule, DonationCard, MatError],
  templateUrl: './donation-list.html',
  styleUrl: './donation-list.css',
})
export class DonationList {
  readonly store = inject(PaymentsStore);
  protected router = inject(Router);

  editDonation(id: number) {
    this.router.navigate(['payments/donations/edit', id]).then();
  }

  deleteDonation(id: number) {
    this.store.deleteDonation(id);
  }
}
