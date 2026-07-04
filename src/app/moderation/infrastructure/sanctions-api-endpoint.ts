import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Sanction } from '../domain/model/sanction.entity';
import { CreateSanctionRequest } from '../domain/model/create-sanction.request';
import { SanctionAssembler } from './sanction-assembler';
import { SanctionResource } from './sanctions-response';


export class SanctionsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderSanctionsEndpointPath}`;
    private readonly assembler = new SanctionAssembler();

    constructor(private http: HttpClient) {}

    /** US25 — el backend valida que reportId exista, pero no cierra el reporte solo. */
    create(request: CreateSanctionRequest): Observable<Sanction> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<SanctionResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo aplicar la sanción')),
        );
    }

    getAll(): Observable<Sanction[]> {
        return this.http.get<SanctionResource[]>(this.baseUrl).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener las sanciones')),
        );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Sanción no encontrada'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}