import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface TutorsResponse extends BaseResponse {
  tutors: TutorResource[];
}

export interface TutorResource extends BaseResource {
  id: number;
  name: string;
  university: string;
  course: string;
  rating: number;
  biography: string;
}
