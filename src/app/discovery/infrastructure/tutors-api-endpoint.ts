import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tutor } from '../domain/model/tutor.entity';
import { CreateTutorRequest } from '../domain/model/create-tutor.request';
import { UpdateTutorRequest } from '../domain/model/update-tutor.request';
import { TutorAssembler } from './tutor-assembler';
import { TutorResource } from './tutors-response';

export class TutorsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderTutorsEndpointPath}`;
    private readonly assembler = new TutorAssembler();

    constructor(private http: HttpClient) {}

    /** US_IAM — completar el perfil de tutor justo después del sign-up con ROLE_TUTOR. */
    create(request: CreateTutorRequest): Observable<Tutor> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<TutorResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo crear el perfil de tutor')),
        );
    }

    /** US_IAM — editar mi propio perfil. Requiere JWT; el backend valida que Tutor.userId sea el mío (403 si no). */
    update(tutorId: number, request: UpdateTutorRequest): Observable<Tutor> {
        const resource = this.assembler.toResourceFromUpdateRequest(request);
        return this.http.put<TutorResource>(`${this.baseUrl}/${tutorId}`, resource).pipe(
            map((updated) => this.assembler.toEntityFromResource(updated)),
            catchError(this.handleError('No se pudo actualizar el perfil')),
        );
    }

    getAll(): Observable<Tutor[]> {
        return this.http.get<TutorResource[]>(this.baseUrl).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener los tutores')),
        );
    }

    getById(tutorId: number): Observable<Tutor> {
        return this.http.get<TutorResource>(`${this.baseUrl}/${tutorId}`).pipe(
            map((resource) => this.assembler.toEntityFromResource(resource)),
            catchError(this.handleError('No se pudo obtener el tutor')),
        );
    }

    /** US_IAM — resolver si el usuario logueado ya tiene perfil de tutor armado. Null si no (404). */
    getByUserId(userId: number): Observable<Tutor | null> {
        return this.http.get<TutorResource>(`${this.baseUrl}/user/${userId}`).pipe(
            map((resource) => this.assembler.toEntityFromResource(resource)),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) return of(null);
                return this.handleError('No se pudo verificar el perfil de tutor')(error);
            }),
        );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Tutor no encontrado'
                    : error.status === 403
                        ? 'No tienes permiso para editar este perfil'
                        : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}