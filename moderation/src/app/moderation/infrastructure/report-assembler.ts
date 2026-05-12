import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Report } from '../domain/model/report.entity';
import { ReportsResponse, ReportResource } from './reports-response';

export class ReportAssembler implements BaseAssembler<Report, ReportResource, ReportsResponse> {

  toEntitiesFromResponse(response: ReportsResponse): Report[] {
    const items = response.reports ?? (response as unknown as ReportResource[]);
    return (Array.isArray(items) ? items : [items]).map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: ReportResource): Report {
    return new Report({
      id:             resource.id,
      reportedUserId: resource.reportedUserId,
      reporterUserId: resource.reporterUserId,
      reason:         resource.reason,
      status:         resource.status,
      closed:         resource.closed ?? false,
      createdAt:      resource.createdAt,
    });
  }

  toResourceFromEntity(entity: Report): ReportResource {
    return {
      id:             entity.id,
      reportedUserId: entity.reportedUserId,
      reporterUserId: entity.reporterUserId,
      reason:         entity.reason,
      status:         entity.status,
      closed:         entity.closed,
      createdAt:      entity.createdAt.toISOString(),
    } as ReportResource;
  }
}
