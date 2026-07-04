import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Quiz } from '../domain/model/quiz.entity';
import { CreateQuizRequest } from '../domain/model/create-quiz.request';
import { QuizAssembler } from './quiz-assembler';
import { QuizResource } from './quizzes-response';


export class QuizzesApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderQuizzesEndpointPath}`;
    private readonly assembler = new QuizAssembler();

    constructor(private http: HttpClient) {}


    create(request: CreateQuizRequest): Observable<Quiz> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<QuizResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo crear el quiz')),
        );
    }

    getAll(): Observable<Quiz[]> {
        return this.http.get<QuizResource[]>(this.baseUrl).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener los quizzes')),
        );
    }

    delete(quizId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${quizId}`).pipe(
            catchError(this.handleError('No se pudo eliminar el quiz')),
        );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Quiz no encontrado'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}