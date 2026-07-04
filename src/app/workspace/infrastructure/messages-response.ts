import { BaseResource } from '../../shared/infrastructure/base-response';

export interface MessageResource extends BaseResource {
  id: number;
  content: string;
  senderId: number;
  sessionId: number;
  sentAt: string;
}


export interface CreateMessageResource {
  content: string;
  senderId: number;
  sessionId: number;
}