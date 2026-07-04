import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsStore } from '../../../application/payments-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';

@Component({
    selector: 'app-donate',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './donate.html',
    styleUrl: './donate.css',
})
export class Donate {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    readonly store = inject(PaymentsStore);

    readonly tutorId: number = +(this.route.snapshot.queryParamMap.get('tutorId') ?? 0);
    readonly tutorName: string = this.route.snapshot.queryParamMap.get('tutorName') ?? 'Tutor';
    readonly sessionId: number = +(this.route.snapshot.queryParamMap.get('sessionId') ?? 0);

    /** Paso actual: 'amount' | 'card' | 'processing' | 'success' */
    readonly step = signal<'amount' | 'card' | 'processing' | 'success'>('amount');

    /** Comisión fija de la plataforma — solo para el preview, el store la vuelve a fijar igual. */
    readonly COMMISSION_PERCENT = 5;

    readonly presetAmounts = [5, 10, 15, 20, 30, 50];
    readonly selectedAmount = signal<number>(0);

    amountForm = this.fb.group({
        customAmount: new FormControl<number | null>(null),
    });

    cardForm = this.fb.group({
        cardNumber: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)],
        }),
        cardName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        expiry: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)],
        }),
        cvv: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^\d{3,4}$/)],
        }),
    });

    constructor() {
        // Solo avanzamos a 'success' cuando el backend de verdad confirmó las 3
        // llamadas encadenadas (crear donación, marcarla completed, abonar wallet).
        effect(() => {
            if (this.store.donationSuccess() && this.step() === 'processing') {
                this.step.set('success');
            }
        });
    }

    selectPreset(amount: number): void {
        this.selectedAmount.set(amount);
        this.amountForm.reset();
    }

    get finalAmount(): number {
        return this.selectedAmount() || (this.amountForm.value.customAmount ?? 0);
    }

    get commissionAmount(): number {
        return Math.round(this.finalAmount * (this.COMMISSION_PERCENT / 100) * 100) / 100;
    }

    get netAmount(): number {
        return Math.round((this.finalAmount - this.commissionAmount) * 100) / 100;
    }

    proceedToCard(): void {
        if (this.finalAmount <= 0) return;
        this.step.set('card');
    }

    /** Va agregando un espacio cada 4 dígitos mientras se escribe (ej. 4111 1111 1111 1111). */
    formatCardNumber(event: Event): void {
        const input = event.target as HTMLInputElement;
        const digitsOnly = input.value.replace(/\D/g, '').slice(0, 16);
        const formatted = digitsOnly.match(/.{1,4}/g)?.join(' ') ?? digitsOnly;
        input.value = formatted;
        this.cardForm.get('cardNumber')!.setValue(formatted, { emitEvent: false });
    }

    /** Simula el flujo de Stripe — el paso 'processing' se muestra mientras el backend confirma de verdad. */
    confirmPayment(): void {
        if (this.cardForm.invalid || this.finalAmount <= 0) return;
        this.step.set('processing');
        this.store.donate(CURRENT_LEARNER_ID(), this.tutorId, this.sessionId, this.finalAmount);
    }

    goBack(): void {
        if (this.step() === 'card') { this.step.set('amount'); return; }
        if (this.sessionId) {
            this.router.navigate(['workspace/tutoring-sessions', this.sessionId]).then();
        } else {
            this.router.navigate(['discovery/tutors', this.tutorId]).then();
        }
    }

    goToWallet(): void {
        this.router.navigate(['payments/wallet']).then();
    }
}
