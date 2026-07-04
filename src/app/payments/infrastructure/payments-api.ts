import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Donation } from '../domain/model/donation.entity';
import { Wallet } from '../domain/model/wallet.entity';
import { DonationStatus } from '../domain/model/donation-status';
import { CreateDonationRequest } from '../domain/model/create-donation.request';
import { CreateWalletRequest } from '../domain/model/create-wallet.request';
import { DonationsApiEndpoint } from './donations-api-endpoint';
import { WalletApiEndpoint } from './wallet-api-endpoint';

@Injectable({ providedIn: 'root' })
export class PaymentsApi extends BaseApi {
    private readonly donationsEndpoint: DonationsApiEndpoint;
    private readonly walletEndpoint: WalletApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.donationsEndpoint = new DonationsApiEndpoint(http);
        this.walletEndpoint = new WalletApiEndpoint(http);
    }

    createDonation(request: CreateDonationRequest): Observable<Donation> {
        return this.donationsEndpoint.create(request);
    }

    getDonationsByTutor(tutorId: number): Observable<Donation[]> {
        return this.donationsEndpoint.getByTutorId(tutorId);
    }

    updateDonationStatus(donationId: number, status: DonationStatus): Observable<Donation> {
        return this.donationsEndpoint.updateStatus(donationId, status);
    }

    createWallet(request: CreateWalletRequest): Observable<Wallet> {
        return this.walletEndpoint.create(request);
    }

    getWalletByTutor(tutorId: number): Observable<Wallet> {
        return this.walletEndpoint.getByTutorId(tutorId);
    }

    addFundsToWallet(walletId: number, amount: number): Observable<Wallet> {
        return this.walletEndpoint.addFunds(walletId, amount);
    }

    withdrawFundsFromWallet(walletId: number, amount: number): Observable<Wallet> {
        return this.walletEndpoint.withdrawFunds(walletId, amount);
    }
}