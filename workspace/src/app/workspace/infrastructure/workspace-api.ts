import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { Message } from '../domain/model/message.entity';
import { HttpClient } from '@angular/common/http';
import { TutoringSessionsApiEndpoint } from './tutoring-sessions-api-endpoint';
import { MessagesApiEndpoint } from './messages-api-endpoint';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WorkspaceApi extends BaseApi {
  private readonly tutoringSessionsEndpoint: TutoringSessionsApiEndpoint;
  private readonly messagesEndpoint: MessagesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.tutoringSessionsEndpoint = new TutoringSessionsApiEndpoint(http);
    this.messagesEndpoint = new MessagesApiEndpoint(http);
  }

  // --- TutoringSession CRUD ---

  /**
   * Retrieves all tutoring sessions from the API.
   */
  getTutoringSessions(): Observable<TutoringSession[]> {
    return this.tutoringSessionsEndpoint.getAll();
  }

  /**
   * Retrieves a single tutoring session by ID.
   */
  getTutoringSession(id: number): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.getById(id);
  }

  /**
   * Creates a new tutoring session.
   */
  createTutoringSession(session: TutoringSession): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.create(session);
  }

  /**
   * Updates an existing tutoring session.
   */
  updateTutoringSession(session: TutoringSession): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.update(session, session.id);
  }

  /**
   * Deletes a tutoring session by ID.
   */
  deleteTutoringSession(id: number): Observable<void> {
    return this.tutoringSessionsEndpoint.delete(id);
  }

  // --- Message CRUD ---

  /**
   * Retrieves all messages from the API.
   */
  getMessages(): Observable<Message[]> {
    return this.messagesEndpoint.getAll();
  }

  /**
   * Retrieves a single message by ID.
   */
  getMessage(id: number): Observable<Message> {
    return this.messagesEndpoint.getById(id);
  }

  /**
   * Creates a new message.
   */
  createMessage(message: Message): Observable<Message> {
    return this.messagesEndpoint.create(message);
  }

  /**
   * Updates an existing message.
   */
  updateMessage(message: Message): Observable<Message> {
    return this.messagesEndpoint.update(message, message.id);
  }

  /**
   * Deletes a message by ID.
   */
  deleteMessage(id: number): Observable<void> {
    return this.messagesEndpoint.delete(id);
  }
}
