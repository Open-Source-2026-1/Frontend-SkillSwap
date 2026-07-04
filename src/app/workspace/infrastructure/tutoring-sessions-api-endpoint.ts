import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { SessionStatus } from '../domain/model/session-status';
import { CreateTutoringSessionRequest } from '../domain/model/create-tutoring-session.request';
import { TutoringSessionAssembler } from './tutoring-session-assembler';
import { TutoringSessionResource } from './tutoring-sessions-response';

export class TutoringSessionsApiEndpoint {
  private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderTutoringSessionsEndpointPath}`;
  private readonly assembler = new TutoringSessionAssembler();

  constructor(private http: HttpClient) {}

  create(request: CreateTutoringSessionRequest): Observable<TutoringSession> {
    const resource = this.assembler.toResourceFromRequest(request);
    return this.http.post<TutoringSessionResource>(this.baseUrl, resource).pipe(
        map((created) => this.assembler.toEntityFromResource(created)),
        catchError(this.handleError('No se pudo crear la solicitud de tutoría')),
    );
  }

  getById(sessionId: number): Observable<TutoringSession> {
    return this.http.get<TutoringSessionResource>(`${this.baseUrl}/${sessionId}`).pipe(
        map((resource) => this.assembler.toEntityFromResource(resource)),
        catchError(this.handleError('No se pudo obtener la sesión')),
    );
  }

  getByLearnerId(learnerId: number): Observable<TutoringSession[]> {
    return this.http.get<TutoringSessionResource[]>(`${this.baseUrl}/learner/${learnerId}`).pipe(
        map((resources) => this.assembler.toEntitiesFromResources(resources)),
        catchError(this.handleError('No se pudieron obtener tus solicitudes como aprendiz')),
    );
  }

  getByTutorId(tutorId: number): Observable<TutoringSession[]> {
    return this.http.get<TutoringSessionResource[]>(`${this.baseUrl}/tutor/${tutorId}`).pipe(
        map((resources) => this.assembler.toEntitiesFromResources(resources)),
        catchError(this.handleError('No se pudieron obtener tus solicitudes como tutor')),
    );
  }

  updateStatus(sessionId: number, status: SessionStatus): Observable<TutoringSession> {
    return this.http
        .patch<TutoringSessionResource>(`${this.baseUrl}/${sessionId}/status`, { status })
        .pipe(
            map((updated) => this.assembler.toEntityFromResource(updated)),
            catchError(this.handleError('No se pudo actualizar el estado de la sesión')),
        );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const detail =
          error.status === 404
              ? 'Sesión no encontrada'
              : (error.error?.message ?? error.statusText ?? 'Error inesperado');
      return throwError(() => new Error(`${operation}: ${detail}`));
    };
  }
}