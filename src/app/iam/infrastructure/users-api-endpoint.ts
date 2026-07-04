import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../domain/model/user.entity';
import { UpdateUserRolesRequest } from '../domain/model/update-user-roles.request';
import { UserAssembler } from './user-assembler';
import { UserResource } from './users-response';

/** Endpoint dedicado a /api/v1/users. Requiere JWT (salvo sign-up/sign-in). */
export class UsersApiEndpoint {
  private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderUsersEndpointPath}`;
  private readonly assembler = new UserAssembler();

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<UserResource[]>(this.baseUrl).pipe(
      map((resources) => this.assembler.toEntitiesFromResources(resources)),
      catchError(this.handleError('No se pudieron obtener los usuarios')),
    );
  }

  getById(id: number): Observable<User> {
    return this.http.get<UserResource>(`${this.baseUrl}/${id}`).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('No se pudo obtener el usuario')),
    );
  }

  /** US_IAM — agregar/quitar un rol de una cuenta existente (ej. Valeria: aprendiz -> también tutora). */
  updateRoles(id: number, request: UpdateUserRolesRequest): Observable<User> {
    const resource = this.assembler.toResourceFromUpdateRolesRequest(request);
    return this.http.patch<UserResource>(`${this.baseUrl}/${id}/roles`, resource).pipe(
      map((updated) => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('No se pudieron actualizar los roles')),
    );
  }

  /** US04 — simula confirmar el enlace del correo institucional. Sin body. */
  verify(id: number): Observable<User> {
    return this.http.patch<UserResource>(`${this.baseUrl}/${id}/verify`, {}).pipe(
        map((updated) => this.assembler.toEntityFromResource(updated)),
        catchError(this.handleError('No se pudo verificar la cuenta')),
    );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const detail =
        error.status === 404
          ? 'Usuario no encontrado'
          : (error.error?.message ?? error.statusText ?? 'Error inesperado');
      return throwError(() => new Error(`${operation}: ${detail}`));
    };
  }
}
