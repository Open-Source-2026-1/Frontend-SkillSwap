import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Favorite } from '../domain/model/favorite.entity';
import { CreateFavoriteRequest } from '../domain/model/create-favorite.request';
import { FavoriteAssembler } from './favorite-assembler';
import { FavoriteResource } from './favorites-response';

export class FavoritesApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderFavoritesEndpointPath}`;
    private readonly assembler = new FavoriteAssembler();

    constructor(private http: HttpClient) {}

    create(request: CreateFavoriteRequest): Observable<Favorite> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<FavoriteResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo marcar como favorito')),
        );
    }

    getByLearnerId(learnerId: number): Observable<Favorite[]> {
        return this.http.get<FavoriteResource[]>(`${this.baseUrl}/learner/${learnerId}`).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener tus favoritos')),
        );
    }

    removeByLearnerAndTutor(learnerId: number, tutorId: number): Observable<void> {
        return this.http
            .delete<void>(`${this.baseUrl}/learner/${learnerId}/tutor/${tutorId}`)
            .pipe(catchError(this.handleError('No se pudo quitar de favoritos')));
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 409
                    ? 'Este tutor ya está en tus favoritos'
                    : error.status === 404
                        ? 'Favorito no encontrado'
                        : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}