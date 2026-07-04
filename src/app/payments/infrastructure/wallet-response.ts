import { BaseResource } from '../../shared/infrastructure/base-response';

export interface WalletResource extends BaseResource {
    id: number;
    tutorId: number;
    balance: number;
    currency: string;
    bankName: string;
    accountNumber: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateWalletResource {
    tutorId: number;
    currency: string;
    bankName: string;
    accountNumber: string;
}