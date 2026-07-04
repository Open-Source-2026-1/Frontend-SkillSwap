import { BaseResource } from '../../shared/infrastructure/base-response';

export interface SanctionResource extends BaseResource {
    id: number;
    reportId: number;
    sanctionedUserId: number;
    type: string;
    description: string;
    durationDays: number;
    createdAt: string;
    updatedAt: string;
}

/** Body para POST /sanctions — coincide 1:1 con el aggregate, sin campos de más. */
export interface CreateSanctionResource {
    reportId: number;
    sanctionedUserId: number;
    type: string;
    description: string;
    durationDays: number;
}