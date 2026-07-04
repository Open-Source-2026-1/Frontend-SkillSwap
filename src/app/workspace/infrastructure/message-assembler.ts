import { Message } from '../domain/model/message.entity';
import { CreateMessageRequest } from '../domain/model/create-message.request';
import { CreateMessageResource, MessageResource } from './messages-response';

export class MessageAssembler {
  toEntityFromResource(resource: MessageResource): Message {
    return new Message({
      id: resource.id,
      content: resource.content,
      senderId: resource.senderId,
      sessionId: resource.sessionId,
      sentAt: resource.sentAt,
    });
  }

  toEntitiesFromResources(resources: MessageResource[]): Message[] {
    return resources.map((resource) => this.toEntityFromResource(resource));
  }

  toResourceFromRequest(request: CreateMessageRequest): CreateMessageResource {
    return {
      content: request.content,
      senderId: request.senderId,
      sessionId: request.sessionId,
    };
  }
}