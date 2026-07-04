import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../domain/model/user.entity';
import { SignUpRequest } from '../domain/model/sign-up.request';
import { SignInRequest } from '../domain/model/sign-in.request';
import { UserAssembler } from './user-assembler';
import { AuthenticatedUserResource, UserResource } from './users-response';

export interface AuthenticatedSession {
  user: User;
  token: string;
}

/** Endpoint dedicado a /api/v1/authentication. Ambos endpoints son públicos (sin JWT). */
export class AuthenticationApiEndpoint {
  private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderAuthenticationEndpointPath}`;
  private readonly assembler = new UserAssembler();

  constructor(private http: HttpClient) {}

  signUp(request: SignUpRequest): Observable<User> {
    const resource = this.assembler.toResourceFromSignUpRequest(request);
    return this.http.post<UserResource>(`${this.baseUrl}/sign-up`, resource).pipe(
      map((created) => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('No se pudo crear la cuenta')),
    );
  }

  signIn(request: SignInRequest): Observable<AuthenticatedSession> {
    const resource = this.assembler.toResourceFromSignInRequest(request);
    return this.http.post<AuthenticatedUserResource>(`${this.baseUrl}/sign-in`, resource).pipe(
      map((authenticated) => ({
        user: this.assembler.toEntityFromAuthenticatedResource(authenticated),
        token: authenticated.token,
      })),
      catchError(this.handleError('No se pudo iniciar sesión')),
    );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const detail =
        error.status === 404
          ? 'Usuario no encontrado'
          : error.status === 409
            ? 'Ese nombre de usuario ya existe'
            : error.status === 400
              ? 'Usuario o contraseña incorrectos'
              : (error.error?.message ?? error.statusText ?? 'Error inesperado');
      return throwError(() => new Error(`${operation}: ${detail}`));
    };
  }
}
