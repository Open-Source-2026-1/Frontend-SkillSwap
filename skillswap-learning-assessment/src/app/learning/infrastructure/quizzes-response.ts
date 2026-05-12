import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface QuizzesResponse extends BaseResponse {
  quizzes: QuizResource[];
}

export interface QuizResource extends BaseResource {
  id: number;
  title: string;
  course: string;
  status: string;
  professorId: number;
}
