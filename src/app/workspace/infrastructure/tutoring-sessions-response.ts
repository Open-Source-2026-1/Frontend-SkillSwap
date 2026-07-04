import { BaseResource } from '../../shared/infrastructure/base-response';

export interface TutoringSessionResource extends BaseResource {
  id: number;
  learnerId: number;
  tutorId: number;
  topic: string;
  message: string;
  studentLevel: string;
  status: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTutoringSessionResource {
  learnerId: number;
  tutorId: number;
  topic: string;
  message: string;
  studentLevel: string;
  scheduledAt: string;
}


export interface UpdateTutoringSessionStatusResource {
  status: string;
}