import { Sanction } from '../domain/model/sanction.entity';
import { SanctionType } from '../domain/model/sanction.entity';
import { CreateSanctionRequest } from '../domain/model/create-sanction.request';
import { CreateSanctionResource, SanctionResource } from './sanctions-response';

export class SanctionAssembler {
    toEntityFromResource(resource: SanctionResource): Sanction {
        return new Sanction({
            id: resource.id,
            reportId: resource.reportId,
            sanctionedUserId: resource.sanctionedUserId,
            type: resource.type as SanctionType,
            description: resource.description,
            durationDays: resource.durationDays,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: SanctionResource[]): Sanction[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateSanctionRequest): CreateSanctionResource {
        return {
            reportId: request.reportId,
            sanctionedUserId: request.sanctionedUserId,
            type: request.type,
            description: request.description,
            durationDays: request.durationDays,
        };
    }
}