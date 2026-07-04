import { Review } from '../domain/model/review.entity';
import { CreateReviewRequest } from '../domain/model/create-review.request';
import { UpdateReviewReplyRequest } from '../domain/model/update-review-reply.request';
import { CreateReviewResource, ReviewResource, UpdateReviewResource } from './reviews-response';

export class ReviewAssembler {
    toEntityFromResource(resource: ReviewResource): Review {
        return new Review({
            id: resource.id,
            tutorId: resource.tutorId,
            learnerId: resource.learnerId,
            learnerName: resource.learnerName,
            rating: resource.rating,
            comment: resource.comment,
            sessionId: resource.sessionId,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
            tutorReply: resource.tutorReply ?? '',
        });
    }

    toEntitiesFromResources(resources: ReviewResource[]): Review[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateReviewRequest): CreateReviewResource {
        return {
            tutorId: request.tutorId,
            learnerId: request.learnerId,
            learnerName: request.learnerName,
            rating: request.rating,
            comment: request.comment,
            sessionId: request.sessionId,
        };
    }

    toResourceFromUpdateRequest(request: UpdateReviewReplyRequest): UpdateReviewResource {
        return {
            rating: request.rating,
            comment: request.comment,
            tutorReply: request.tutorReply,
        };
    }
}