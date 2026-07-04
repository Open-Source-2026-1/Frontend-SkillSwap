import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Donation } from '../domain/model/donation.entity';
import { DonationStatus } from '../domain/model/donation-status';
import { CreateDonationRequest } from '../domain/model/create-donation.request';
import { DonationAssembler } from './donation-assembler';
import { DonationResource } from './donations-response';


export class DonationsApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderDonationsEndpointPath}`;
    private readonly assembler = new DonationAssembler();

    constructor(private http: HttpClient) {}

    /** US18 — nace en status 'pending'. */
    create(request: CreateDonationRequest): Observable<Donation> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<DonationResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo crear la donación')),
        );
    }

    getByTutorId(tutorId: number): Observable<Donation[]> {
        return this.http.get<DonationResource[]>(`${this.baseUrl}/tutor/${tutorId}`).pipe(
            map((resources) => this.assembler.toEntitiesFromResources(resources)),
            catchError(this.handleError('No se pudieron obtener las donaciones recibidas')),
        );
    }

    /** Simula el paso de pago: pending -> completed (o failed). */
    updateStatus(donationId: number, status: DonationStatus): Observable<Donation> {
        return this.http
            .patch<DonationResource>(`${this.baseUrl}/${donationId}/status`, { status })
            .pipe(
                map((updated) => this.assembler.toEntityFromResource(updated)),
                catchError(this.handleError('No se pudo actualizar el estado de la donación')),
            );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Donación no encontrada'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}