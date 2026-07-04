import { BaseResource } from '../../shared/infrastructure/base-response';

export interface ReportResource extends BaseResource {
    id: number;
    reporterUserId: number;
    reportedUserId: number;
    sessionId: number;
    reason: string;
    status: string;
    closed: boolean;
    reportedAt: string;
    createdAt: string;
    updatedAt: string;
}

/** Body para POST /reports. `status` se manda vacío para que el backend asigne 'pending'. */
export interface CreateReportResource {
    reporterUserId: number;
    reportedUserId: number;
    sessionId: number;
    reason: string;
    status: string;
}