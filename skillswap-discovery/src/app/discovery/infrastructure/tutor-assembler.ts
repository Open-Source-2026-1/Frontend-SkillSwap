import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Tutor } from '../domain/model/tutor.entity';
import { TutorResource, TutorsResponse } from './tutors-response';

export class TutorAssembler implements BaseAssembler<Tutor, TutorResource, TutorsResponse> {
  toEntitiesFromResponse(response: TutorsResponse): Tutor[] {
    return response.tutors.map((resource) => this.toEntityFromResource(resource as TutorResource));
  }

  toEntityFromResource(resource: TutorResource): Tutor {
    return new Tutor({
      id: resource.id,
      name: resource.name,
      university: resource.university,
      course: resource.course,
      rating: resource.rating,
      biography: resource.biography,
    });
  }

  toResourceFromEntity(entity: Tutor): TutorResource {
    return {
      id: entity.id,
      name: entity.name,
      university: entity.university,
      course: entity.course,
      rating: entity.rating,
      biography: entity.biography,
    } as TutorResource;
  }
}
