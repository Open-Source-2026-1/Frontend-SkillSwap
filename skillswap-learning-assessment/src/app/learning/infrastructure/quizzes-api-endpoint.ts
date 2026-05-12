import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Quiz } from '../domain/model/quiz.entity';
import { QuizResource, QuizzesResponse } from './quizzes-response';
import { QuizAssembler } from './quiz-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class QuizzesApiEndpoint extends BaseApiEndpoint<
  Quiz,
  QuizResource,
  QuizzesResponse,
  QuizAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.serverBaseUrl}${environment.quizzesEndpointPath}`,
      new QuizAssembler(),
    );
  }
}
