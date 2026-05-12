import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface QuestionsResponse extends BaseResponse {
  questions: QuestionResource[];
}

export interface QuestionResource extends BaseResource {
  id: number;
  quizId: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}
