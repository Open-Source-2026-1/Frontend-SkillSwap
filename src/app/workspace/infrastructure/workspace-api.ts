import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { Message } from '../domain/model/message.entity';
import { SessionStatus } from '../domain/model/session-status';
import { CreateTutoringSessionRequest } from '../domain/model/create-tutoring-session.request';
import { CreateMessageRequest } from '../domain/model/create-message.request';
import { TutoringSessionsApiEndpoint } from './tutoring-sessions-api-endpoint';
import { MessagesApiEndpoint } from './messages-api-endpoint';

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


  requestTutoringSession(request: CreateTutoringSessionRequest): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.create(request);
  }

  getTutoringSessionById(sessionId: number): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.getById(sessionId);
  }

  getTutoringSessionsByLearnerId(learnerId: number): Observable<TutoringSession[]> {
    return this.tutoringSessionsEndpoint.getByLearnerId(learnerId);
  }

  getTutoringSessionsByTutorId(tutorId: number): Observable<TutoringSession[]> {
    return this.tutoringSessionsEndpoint.getByTutorId(tutorId);
  }

  updateTutoringSessionStatus(
      sessionId: number,
      status: SessionStatus,
  ): Observable<TutoringSession> {
    return this.tutoringSessionsEndpoint.updateStatus(sessionId, status);
  }


  sendMessage(request: CreateMessageRequest): Observable<Message> {
    return this.messagesEndpoint.create(request);
  }

  getMessagesBySessionId(sessionId: number): Observable<Message[]> {
    return this.messagesEndpoint.getBySessionId(sessionId);
  }
}