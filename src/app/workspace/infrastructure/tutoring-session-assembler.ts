import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { SessionStatus } from '../domain/model/session-status';
import { CreateTutoringSessionRequest } from '../domain/model/create-tutoring-session.request';
import {
  CreateTutoringSessionResource,
  TutoringSessionResource,
} from './tutoring-sessions-response';

export class TutoringSessionAssembler {
  toEntityFromResource(resource: TutoringSessionResource): TutoringSession {
    return new TutoringSession({
      id: resource.id,
      topic: resource.topic,
      status: resource.status as SessionStatus,
      learnerId: resource.learnerId,
      tutorId: resource.tutorId,
      scheduledAt: resource.scheduledAt,
      message: resource.message ?? '',
      studentLevel: resource.studentLevel ?? '',
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  }

  toEntitiesFromResources(resources: TutoringSessionResource[]): TutoringSession[] {
    return resources.map((resource) => this.toEntityFromResource(resource));
  }

  toResourceFromRequest(request: CreateTutoringSessionRequest): CreateTutoringSessionResource {
    return {
      learnerId: request.learnerId,
      tutorId: request.tutorId,
      topic: request.topic,
      message: request.message,
      studentLevel: request.studentLevel,
      scheduledAt: request.scheduledAt,
    };
  }
}