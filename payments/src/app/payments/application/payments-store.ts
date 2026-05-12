import { computed, signal } from '@angular/core';
import { Donation } from '../domain/model/donation.entity';
import { PaymentsApi } from '../infrastructure/payments-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentsStore {
  private readonly donationsSignal = signal<Donation[]>([]);

  readonly donations = this.donationsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly donationCount = computed(() => this.donations().length);

  /**
   * Computed total original amount: sum of all amounts before commission.
   */
  readonly totalAmount = computed(() => this.donations().reduce((acc, d) => acc + d.amount, 0));

  /**
   * Computed total commission: sum of all commission fees.
   */
  readonly totalCommission = computed(() => this.donations().reduce((acc, d) => acc + d.commissionFee, 0));

  /**
   * Computed total balance: sum of all netAmounts.
   */
  readonly totalBalance = computed(() => this.donations().reduce((acc, d) => acc + d.netAmount, 0));

  constructor(private paymentsApi: PaymentsApi) {
    this.loadDonations();
  }

  /**
   * Adds a new donation.
   * @param donation - The donation to add.
   */
  addDonation(donation: Donation): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi
      .createDonation(donation)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.donationsSignal.update((donations) => [...donations, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create donation'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing donation.
   * @param updatedDonation - The donation to update.
   */
  updateDonation(updatedDonation: Donation): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi
      .updateDonation(updatedDonation)
      .pipe(retry(2))
      .subscribe({
        next: (donation) => {
          this.donationsSignal.update((donations) =>
            donations.map((d) => (d.id === donation.id ? donation : d)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update donation'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a donation by ID.
   * @param id - The ID of the donation to delete.
   */
  deleteDonation(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi
      .deleteDonation(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.donationsSignal.update((donations) => donations.filter((d) => d.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete donation'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all donations from the API.
   */
  private loadDonations(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi
      .getDonations()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (donations) => {
          this.donationsSignal.set(donations);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load donations'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Formats error messages for user-friendly display.
   * @param error - The error object.
   * @param fallback - The fallback error message.
   * @returns A formatted error message.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
