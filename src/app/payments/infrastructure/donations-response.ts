import { BaseResource } from '../../shared/infrastructure/base-response';

export interface DonationResource extends BaseResource {
    id: number;
    donorId: number;
    tutorId: number;
    sessionId: number;
    amount: number;
    netAmount: number;
    commission: number;
    currency: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateDonationResource {
    donorId: number;
    tutorId: number;
    sessionId: number;
    amount: number;
    commission: number;
    currency: string;
}