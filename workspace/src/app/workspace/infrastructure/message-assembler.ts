import { MessageResource, MessagesResponse } from './messages-response';
import { Message } from '../domain/model/message.entity';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
export class MessageAssembler implements BaseAssembler<Message, MessageResource, MessagesResponse> {
  toEntitiesFromResponse(response: MessagesResponse): Message[] {
    console.log(response);
    return response.messages.map((resource) =>
      this.toEntityFromResource(resource as MessageResource),
    );
  }

  toEntityFromResource(resource: MessageResource): Message {
    return new Message({
      id: resource.id,
      content: resource.content,
      senderId: resource.senderId,
      sessionId: resource.sessionId,
      sentAt: resource.sentAt,
    });
  }

  toResourceFromEntity(entity: Message): MessageResource {
    return {
      id: entity.id,
      content: entity.content,
      senderId: entity.senderId,
      sessionId: entity.sessionId,
      sentAt: entity.sentAt,
    } as MessageResource;
  }
}
