import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Quiz } from '../domain/model/quiz.entity';
import { QuizResource, QuizzesResponse } from './quizzes-response';

export class QuizAssembler implements BaseAssembler<Quiz, QuizResource, QuizzesResponse> {
  toEntitiesFromResponse(response: QuizzesResponse): Quiz[] {
    return response.quizzes.map((resource) => this.toEntityFromResource(resource as QuizResource));
  }

  toEntityFromResource(resource: QuizResource): Quiz {
    return new Quiz({
      id: resource.id,
      title: resource.title,
      course: resource.course,
      status: resource.status,
      professorId: resource.professorId,
    });
  }

  toResourceFromEntity(entity: Quiz): QuizResource {
    return {
      id: entity.id,
      title: entity.title,
      course: entity.course,
      status: entity.status,
      professorId: entity.professorId,
    } as QuizResource;
  }
}
