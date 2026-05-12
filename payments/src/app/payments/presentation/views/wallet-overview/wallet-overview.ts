import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentsStore } from '../../../application/payments-store';
import { MatError } from '@angular/material/form-field';
import { DecimalPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-wallet-overview',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatError,
    DecimalPipe,
    SlicePipe,
  ],
  templateUrl: './wallet-overview.html',
  styleUrl: './wallet-overview.css',
})
export class WalletOverview {
  readonly store = inject(PaymentsStore);
}
