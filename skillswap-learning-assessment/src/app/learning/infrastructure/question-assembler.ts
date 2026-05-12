import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Question } from '../domain/model/question.entity';
import { QuestionResource, QuestionsResponse } from './questions-response';

export class QuestionAssembler implements BaseAssembler<
  Question,
  QuestionResource,
  QuestionsResponse
> {
  toEntitiesFromResponse(response: QuestionsResponse): Question[] {
    return response.questions.map((resource) =>
      this.toEntityFromResource(resource as QuestionResource),
    );
  }

  toEntityFromResource(resource: QuestionResource): Question {
    return new Question({
      id: resource.id,
      quizId: resource.quizId,
      text: resource.text,
      optionA: resource.optionA,
      optionB: resource.optionB,
      optionC: resource.optionC,
      optionD: resource.optionD,
      correctOption: resource.correctOption,
    });
  }

  toResourceFromEntity(entity: Question): QuestionResource {
    return {
      id: entity.id,
      quizId: entity.quizId,
      text: entity.text,
      optionA: entity.optionA,
      optionB: entity.optionB,
      optionC: entity.optionC,
      optionD: entity.optionD,
      correctOption: entity.correctOption,
    } as QuestionResource;
  }
}
