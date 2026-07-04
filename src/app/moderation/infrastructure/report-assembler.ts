import { Report } from '../domain/model/report.entity';
import { ReportStatus } from '../domain/model/report-status';
import { CreateReportRequest } from '../domain/model/create-report.request';
import { CreateReportResource, ReportResource } from './reports-response';

export class ReportAssembler {
    toEntityFromResource(resource: ReportResource): Report {
        return new Report({
            id: resource.id,
            reporterUserId: resource.reporterUserId,
            reportedUserId: resource.reportedUserId,
            sessionId: resource.sessionId,
            reason: resource.reason,
            status: resource.status as ReportStatus,
            closed: resource.closed,
            reportedAt: resource.reportedAt,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: ReportResource[]): Report[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateReportRequest): CreateReportResource {
        return {
            reporterUserId: request.reporterUserId,
            reportedUserId: request.reportedUserId,
            sessionId: request.sessionId,
            reason: request.reason,
            status: '', // el backend cae a 'pending' si llega vacío
        };
    }
}