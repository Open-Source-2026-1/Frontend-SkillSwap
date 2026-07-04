import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Report } from '../domain/model/report.entity';
import { CreateReportRequest } from '../domain/model/create-report.request';
import { ReportAssembler } from './report-assembler';
import { ReportResource } from './reports-response';


export class ReportsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderReportsEndpointPath}`;
    private readonly assembler = new ReportAssembler();

    constructor(private http: HttpClient) {}

    /** US24 — Learner/Tutor envía un reporte. Nace en status 'pending'. */
    create(request: CreateReportRequest): Observable<Report> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<ReportResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo enviar el reporte')),
        );
    }

    getAll(): Observable<Report[]> {
        return this.http.get<ReportResource[]>(this.baseUrl).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener los reportes')),
        );
    }

    /** US25 — moderador resuelve el reporte. Sin body: fuerza closed=true, status='resolved'. */
    close(reportId: number): Observable<Report> {
        return this.http.patch<ReportResource>(`${this.baseUrl}/${reportId}/close`, {}).pipe(
            map((updated) => this.assembler.toEntityFromResource(updated)),
            catchError(this.handleError('No se pudo resolver el reporte')),
        );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Reporte no encontrado'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}