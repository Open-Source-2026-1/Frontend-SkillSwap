import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SanctionsResponse extends BaseResponse {
  sanctions: SanctionResource[];
}

export interface SanctionResource extends BaseResource {
  id: number;
  reportId: number;
  sanctionedUserId: number;
  type: string;
  description: string;
  durationDays: number;
  createdAt: string;
}
