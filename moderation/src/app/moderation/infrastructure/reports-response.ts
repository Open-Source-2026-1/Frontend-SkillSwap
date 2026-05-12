import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ReportsResponse extends BaseResponse {
  reports: ReportResource[];
}

export interface ReportResource extends BaseResource {
  id: number;
  reportedUserId: number;
  reporterUserId: number;
  reason: string;
  status: string;
  closed: boolean;
  createdAt: string;
}
