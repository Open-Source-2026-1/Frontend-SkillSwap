import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { QuizAttempt } from '../domain/model/quiz-attempt.entity';
import { CreateQuizAttemptRequest } from '../domain/model/create-quiz-attempt.request';
import { QuizAttemptAssembler } from './quiz-attempt-assembler';
import { QuizAttemptResource } from './quiz-attempts-response';


export class QuizAttemptsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderQuizAttemptsEndpointPath}`;
    private readonly assembler = new QuizAttemptAssembler();

    constructor(private http: HttpClient) {}


    create(request: CreateQuizAttemptRequest): Observable<QuizAttempt> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<QuizAttemptResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo iniciar el intento del quiz')),
        );
    }

    getByLearnerId(learnerId: number): Observable<QuizAttempt[]> {
        return this.http.get<QuizAttemptResource[]>(`${this.baseUrl}/learner/${learnerId}`).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener tus intentos')),
        );
    }


    complete(attemptId: number, answers: number[]): Observable<QuizAttempt> {
        const resource = this.assembler.toCompleteResourceFromAnswers(answers);
        return this.http
            .patch<QuizAttemptResource>(`${this.baseUrl}/${attemptId}/complete`, resource)
            .pipe(
                map((updated) => this.assembler.toEntityFromResource(updated)),
                catchError(this.handleError('No se pudo calificar el intento')),
            );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Intento no encontrado'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}