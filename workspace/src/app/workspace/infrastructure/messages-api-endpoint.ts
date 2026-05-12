import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Message } from '../domain/model/message.entity';
import { MessageResource, MessagesResponse } from './messages-response';
import { MessageAssembler } from './message-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export class MessagesApiEndpoint extends BaseApiEndpoint<
  Message,
  MessageResource,
  MessagesResponse,
  MessageAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderMessagesEndpointPath}`,
      new MessageAssembler(),
    );
  }
}
