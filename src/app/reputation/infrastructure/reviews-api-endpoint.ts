import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Review } from '../domain/model/review.entity';
import { CreateReviewRequest } from '../domain/model/create-review.request';
import { UpdateReviewReplyRequest } from '../domain/model/update-review-reply.request';
import { ReviewAssembler } from './review-assembler';
import { ReviewResource } from './reviews-response';


export class ReviewsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderReviewsEndpointPath}`;
    private readonly assembler = new ReviewAssembler();

    constructor(private http: HttpClient) {}

    /** US17 — Learner deja una reseña. */
    create(request: CreateReviewRequest): Observable<Review> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<ReviewResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo crear la reseña')),
        );
    }

    getAll(): Observable<Review[]> {
        return this.http.get<ReviewResource[]>(this.baseUrl).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener las reseñas')),
        );
    }

    getById(reviewId: number): Observable<Review> {
        return this.http.get<ReviewResource>(`${this.baseUrl}/${reviewId}`).pipe(
            map((resource) => this.assembler.toEntityFromResource(resource)),
            catchError(this.handleError('No se pudo obtener la reseña')),
        );
    }

    getByTutorId(tutorId: number): Observable<Review[]> {
        return this.http.get<ReviewResource[]>(`${this.baseUrl}/tutor/${tutorId}`).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener las reseñas del tutor')),
        );
    }

    getByLearnerId(learnerId: number): Observable<Review[]> {
        return this.http.get<ReviewResource[]>(`${this.baseUrl}/learner/${learnerId}`).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener tus reseñas')),
        );
    }

    /** Tutor responde una reseña — reenvía rating+comment+tutorReply juntos. */
    update(reviewId: number, request: UpdateReviewReplyRequest): Observable<Review> {
        const resource = this.assembler.toResourceFromUpdateRequest(request);
        return this.http.put<ReviewResource>(`${this.baseUrl}/${reviewId}`, resource).pipe(
            map((updated) => this.assembler.toEntityFromResource(updated)),
            catchError(this.handleError('No se pudo responder la reseña')),
        );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Reseña no encontrada'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}