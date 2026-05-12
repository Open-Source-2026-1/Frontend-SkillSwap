import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of tutoring sessions.
 */
export interface TutoringSessionsResponse extends BaseResponse {
  /**
   * The list of tutoring sessions returned by the API.
   */
  tutoringSessions: TutoringSessionResource[];
}

/**
 * Represents the API resource/DTO for a tutoring session.
 */
export interface TutoringSessionResource extends BaseResource {
  id: number;
  topic: string;
  status: string;
  learnerId: number;
  tutorId: number;
  scheduledAt: string;
}
