import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentsStore } from '../../../application/payments-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe  } from '@angular/common';


@Component({
    selector: 'app-wallet',
    imports: [
        MatButtonModule, MatIconModule, MatProgressSpinner,
        MatFormFieldModule, MatInputModule, ReactiveFormsModule, DatePipe ,
    ],
    templateUrl: './wallet.html',
    styleUrl: './wallet.css',
})
export class WalletView {
    readonly store = inject(PaymentsStore);
    protected router = inject(Router);
    private fb = inject(FormBuilder);

    readonly showWalletInfo = signal<boolean>(false);

    bankForm = this.fb.group({
        bankName: new FormControl<string>('', {
            nonNullable: true, validators: [Validators.required],
        }),
        accountNumber: new FormControl<string>('', {
            nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{10,20}$/)],
        }),
    });

    createWallet(): void {
        if (this.bankForm.invalid) return;
        this.store.createWallet(
            this.bankForm.value.bankName!,
            this.bankForm.value.accountNumber!,
        );
    }

    requestWithdrawal(): void {
        this.store.withdrawAll();
    }

    goBack(): void {
        this.router.navigate(['/workspace/tutoring-sessions']).then();
    }
}