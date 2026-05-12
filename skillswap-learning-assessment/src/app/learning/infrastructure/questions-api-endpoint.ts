import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Question } from '../domain/model/question.entity';
import { QuestionResource, QuestionsResponse } from './questions-response';
import { QuestionAssembler } from './question-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class QuestionsApiEndpoint extends BaseApiEndpoint<
  Question,
  QuestionResource,
  QuestionsResponse,
  QuestionAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.serverBaseUrl}${environment.questionsEndpointPath}`,
      new QuestionAssembler(),
    );
  }
}
