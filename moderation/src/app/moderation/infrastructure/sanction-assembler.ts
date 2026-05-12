import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Sanction } from '../domain/model/sanction.entity';
import { SanctionsResponse, SanctionResource } from './sanctions-response';

export class SanctionAssembler implements BaseAssembler<Sanction, SanctionResource, SanctionsResponse> {

  toEntitiesFromResponse(response: SanctionsResponse): Sanction[] {
    const items = response.sanctions ?? (response as unknown as SanctionResource[]);
    return (Array.isArray(items) ? items : [items]).map(s => this.toEntityFromResource(s));
  }

  toEntityFromResource(resource: SanctionResource): Sanction {
    return new Sanction({
      id:               resource.id,
      reportId:         resource.reportId,
      sanctionedUserId: resource.sanctionedUserId,
      type:             resource.type,
      description:      resource.description,
      durationDays:     resource.durationDays,
      createdAt:        resource.createdAt,
    });
  }

  toResourceFromEntity(entity: Sanction): SanctionResource {
    return {
      id:               entity.id,
      reportId:         entity.reportId,
      sanctionedUserId: entity.sanctionedUserId,
      type:             entity.type,
      description:      entity.description,
      durationDays:     entity.durationDays,
      createdAt:        entity.createdAt.toISOString(),
    } as SanctionResource;
  }
}
