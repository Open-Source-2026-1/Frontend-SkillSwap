import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Review } from '../domain/model/review.entity';
import { CreateReviewRequest } from '../domain/model/create-review.request';
import { UpdateReviewReplyRequest } from '../domain/model/update-review-reply.request';
import { ReviewsApiEndpoint } from './reviews-api-endpoint';

@Injectable({
    providedIn: 'root',
})
export class ReputationApi extends BaseApi {
    private readonly reviewsEndpoint: ReviewsApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.reviewsEndpoint = new ReviewsApiEndpoint(http);
    }

    getReviews(): Observable<Review[]> {
        return this.reviewsEndpoint.getAll();
    }

    getReview(id: number): Observable<Review> {
        return this.reviewsEndpoint.getById(id);
    }

    getReviewsByTutor(tutorId: number): Observable<Review[]> {
        return this.reviewsEndpoint.getByTutorId(tutorId);
    }

    getReviewsByLearner(learnerId: number): Observable<Review[]> {
        return this.reviewsEndpoint.getByLearnerId(learnerId);
    }

    createReview(request: CreateReviewRequest): Observable<Review> {
        return this.reviewsEndpoint.create(request);
    }

    replyToReview(reviewId: number, request: UpdateReviewReplyRequest): Observable<Review> {
        return this.reviewsEndpoint.update(reviewId, request);
    }
}