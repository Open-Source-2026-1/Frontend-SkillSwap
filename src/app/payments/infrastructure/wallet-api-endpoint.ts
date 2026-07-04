import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Wallet } from '../domain/model/wallet.entity';
import { CreateWalletRequest } from '../domain/model/create-wallet.request';
import { WalletAssembler } from './wallet-assembler';
import { WalletResource } from './wallet-response';


export class WalletApiEndpoint {
    private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderWalletsEndpointPath}`;
    private readonly assembler = new WalletAssembler();

    constructor(private http: HttpClient) {}

    /** US20 — crear wallet (una sola vez por tutor, el backend valida unicidad). */
    create(request: CreateWalletRequest): Observable<Wallet> {
        const resource = this.assembler.toResourceFromCreateRequest(request);
        return this.http.post<WalletResource>(this.baseUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('No se pudo crear la wallet')),
        );
    }

    getByTutorId(tutorId: number): Observable<Wallet> {
        return this.http.get<WalletResource>(`${this.baseUrl}/tutor/${tutorId}`).pipe(
            map((resource) => this.assembler.toEntityFromResource(resource)),
            catchError(this.handleError('No se pudo obtener la wallet')),
        );
    }

    addFunds(walletId: number, amount: number): Observable<Wallet> {
        return this.http
            .patch<WalletResource>(`${this.baseUrl}/${walletId}/add-funds`, { amount })
            .pipe(
                map((updated) => this.assembler.toEntityFromResource(updated)),
                catchError(this.handleError('No se pudo abonar a la wallet')),
            );
    }

    withdrawFunds(walletId: number, amount: number): Observable<Wallet> {
        return this.http
            .patch<WalletResource>(`${this.baseUrl}/${walletId}/withdraw-funds`, { amount })
            .pipe(
                map((updated) => this.assembler.toEntityFromResource(updated)),
                catchError(this.handleError('No se pudo procesar el retiro')),
            );
    }

    private handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            const detail =
                error.status === 404
                    ? 'Wallet no encontrada'
                    : (error.error?.message ?? error.statusText ?? 'Error inesperado');
            return throwError(() => new Error(`${operation}: ${detail}`));
        };
    }
}