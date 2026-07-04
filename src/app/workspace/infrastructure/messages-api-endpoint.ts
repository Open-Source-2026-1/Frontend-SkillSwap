import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Message } from '../domain/model/message.entity';
import { CreateMessageRequest } from '../domain/model/create-message.request';
import { MessageAssembler } from './message-assembler';
import { MessageResource } from './messages-response';

/**
 * Endpoint dedicado a /api/v1/messages.
 * El backend no expone GET de todos los mensajes ni edición/borrado (US10 real):
 * solo enviar y listar por sesión.
 */
export class MessagesApiEndpoint {
  private readonly baseUrl = `${environment.platformProviderBackendApiBaseUrl}${environment.platformProviderMessagesEndpointPath}`;
  private readonly assembler = new MessageAssembler();

  constructor(private http: HttpClient) {}

  create(request: CreateMessageRequest): Observable<Message> {
    const resource = this.assembler.toResourceFromRequest(request);
    return this.http.post<MessageResource>(this.baseUrl, resource).pipe(
        map((created) => this.assembler.toEntityFromResource(created)),
        catchError(this.handleError('No se pudo enviar el mensaje')),
    );
  }

  getById(messageId: number): Observable<Message> {
    return this.http.get<MessageResource>(`${this.baseUrl}/${messageId}`).pipe(
        map((resource) => this.assembler.toEntityFromResource(resource)),
        catchError(this.handleError('No se pudo obtener el mensaje')),
    );
  }

  getBySessionId(sessionId: number): Observable<Message[]> {
    return this.http.get<MessageResource[]>(`${this.baseUrl}/session/${sessionId}`).pipe(
        map((resources) => this.assembler.toEntitiesFromResources(resources)),
        catchError(this.handleError('No se pudieron obtener los mensajes de la sesión')),
    );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const detail =
          error.status === 404
              ? 'Recurso no encontrado'
              : (error.error?.message ?? error.statusText ?? 'Error inesperado');
      return throwError(() => new Error(`${operation}: ${detail}`));
    };
  }
}