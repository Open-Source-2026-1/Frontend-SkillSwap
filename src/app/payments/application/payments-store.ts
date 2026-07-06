import { Injectable } from '@angular/core';
import { computed, effect, signal } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Donation } from '../domain/model/donation.entity';
import { Wallet } from '../domain/model/wallet.entity';
import { PaymentsApi } from '../infrastructure/payments-api';
import { IamStore } from '../../iam/application/iam-store';
import { CURRENT_TUTOR_ID, hasTutorProfile } from '../../shared/infrastructure/current-user';

/** Comisión fija de la plataforma. NUNCA editable desde la UI (ver nota de seguridad
 *  en create-donation.request.ts): el backend confía ciegamente en este valor. */
const PLATFORM_COMMISSION_PERCENT = 5;

@Injectable({ providedIn: 'root' })
export class PaymentsStore {
    private readonly walletSignal = signal<Wallet | null>(null);
    private readonly donationsSignal = signal<Donation[]>([]);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);
    private readonly donationSuccessSignal = signal<boolean>(false);

    /** Wallet del tutor actual (si ya la creó) */
    readonly myWallet = this.walletSignal.asReadonly();
    readonly hasWallet = computed(() => this.myWallet() !== null);

    /** Donaciones recibidas por el tutor actual, ya completadas */
    readonly myDonations = computed(() =>
        this.donationsSignal().filter((d) => d.status === 'completed'),
    );

    /** El saldo real vive en la wallet (lo mueve el backend vía add/withdraw-funds) */
    readonly totalBalance = computed(() => this.myWallet()?.balance ?? 0);

    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();
    readonly donationSuccess = this.donationSuccessSignal.asReadonly();

    constructor(
        private paymentsApi: PaymentsApi,
        private iamStore: IamStore,
    ) {
        // Reacciona de verdad a sign-in/sign-out/cambio de perfil de tutor — no solo
        // una vez al arrancar la app. Sin esto, cambiar de cuenta sin refrescar la
        // página dejaba ver la wallet/donaciones de la sesión anterior (o ninguna).
        effect(() => {
            const tutorId = this.iamStore.currentTutorId();
            if (tutorId !== null) {
                this.loadMyWallet();
                this.loadMyDonations();
            } else {
                this.walletSignal.set(null);
                this.donationsSignal.set([]);
            }
        });
    }

    private loadMyWallet(): void {
        this.paymentsApi.getWalletByTutor(CURRENT_TUTOR_ID()).subscribe({
            next: (wallet) => this.walletSignal.set(wallet),
            // 404 = el tutor todavía no creó su wallet; no es un error real, es esperado.
            error: () => this.walletSignal.set(null),
        });
    }

    private loadMyDonations(): void {
        this.loadingSignal.set(true);
        this.paymentsApi.getDonationsByTutor(CURRENT_TUTOR_ID()).subscribe({
            next: (donations) => {
                this.donationsSignal.set(donations);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudieron cargar las donaciones'));
                this.loadingSignal.set(false);
            },
        });
    }


    donate(donorId: number, tutorId: number, sessionId: number, amount: number): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.donationSuccessSignal.set(false);

        this.paymentsApi
            .createDonation({
                donorId,
                tutorId,
                sessionId,
                amount,
                commission: PLATFORM_COMMISSION_PERCENT,
                currency: 'PEN',
            })
            .pipe(
                switchMap((created) => this.paymentsApi.updateDonationStatus(created.id, 'completed')),
                switchMap((completed) =>
                    this.paymentsApi.getWalletByTutor(tutorId).pipe(
                        switchMap((wallet) =>
                            this.paymentsApi.addFundsToWallet(wallet.id, completed.netAmount),
                        ),
                        catchError((err) => {
                            const isMissingWallet =
                                err instanceof Error && err.message.includes('Wallet no encontrada');
                            if (!isMissingWallet) {
                                // Error real (no el 404 esperado) — se reporta, no se traga en silencio.
                                this.errorSignal.set(
                                    'La donación se registró, pero no se pudo abonar al saldo del tutor: ' +
                                    this.formatError(err, 'error desconocido'),
                                );
                            }
                            return of(null);
                        }),
                        switchMap(() => of(completed)),
                    ),
                ),
            )
            .subscribe({
                next: (donation) => {
                    if (hasTutorProfile() && donation.tutorId === CURRENT_TUTOR_ID()) {
                        this.donationsSignal.update((ds) => [...ds, donation]);
                        this.loadMyWallet();
                    }
                    this.donationSuccessSignal.set(true);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo procesar la donación'));
                    this.loadingSignal.set(false);
                },
            });
    }

    /** US20 — crear wallet  */
    createWallet(bankName: string, accountNumber: string): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.paymentsApi
            .createWallet({
                tutorId: CURRENT_TUTOR_ID(),
                currency: 'PEN',
                bankName,
                accountNumber,
            })
            .subscribe({
                next: (wallet) => {
                    this.walletSignal.set(wallet);
                    this.loadingSignal.set(false);
                },
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo crear la wallet'));
                    this.loadingSignal.set(false);
                },
            });
    }


    withdrawAll(): void {
        const wallet = this.myWallet();
        if (!wallet || wallet.balance <= 0) return;

        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.paymentsApi.withdrawFundsFromWallet(wallet.id, wallet.balance).subscribe({
            next: (updated) => {
                this.walletSignal.set(updated);
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudo procesar el retiro'));
                this.loadingSignal.set(false);
            },
        });
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}