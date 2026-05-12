import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { TutoringSessionsResponse, TutoringSessionResource } from './tutoring-sessions-response';
export class TutoringSessionAssembler implements BaseAssembler<
  TutoringSession,
  TutoringSessionResource,
  TutoringSessionsResponse
> {
  toEntitiesFromResponse(response: TutoringSessionsResponse): TutoringSession[] {
    return response.tutoringSessions.map((resource) =>
      this.toEntityFromResource(resource as TutoringSessionResource),
    );
  }

  toEntityFromResource(resource: TutoringSessionResource): TutoringSession {
    return new TutoringSession({
      id: resource.id,
      topic: resource.topic,
      status: resource.status,
      learnerId: resource.learnerId,
      tutorId: resource.tutorId,
      scheduledAt: resource.scheduledAt,
    });
  }

  toResourceFromEntity(entity: TutoringSession): TutoringSessionResource {
    return {
      id: entity.id,
      topic: entity.topic,
      status: entity.status,
      learnerId: entity.learnerId,
      tutorId: entity.tutorId,
      scheduledAt: entity.scheduledAt,
    } as TutoringSessionResource;
  }
}
