import { BaseResource } from '../../shared/infrastructure/base-response';

export interface ReviewResource extends BaseResource {
    id: number;
    tutorId: number;
    learnerId: number;
    learnerName: string;
    rating: number;
    comment: string;
    sessionId: number;
    tutorReply: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateReviewResource {
    tutorId: number;
    learnerId: number;
    learnerName: string;
    rating: number;
    comment: string;
    sessionId: number;
}

export interface UpdateReviewResource {
    rating: number;
    comment: string;
    tutorReply: string;
}