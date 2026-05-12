import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of messages.
 */
export interface MessagesResponse extends BaseResponse {
  /**
   * Array of message resources included in the response.
   */
  messages: MessageResource[];
}

/**
 * Represents a single message resource returned from the API.
 */
export interface MessageResource extends BaseResource {
  /**
   * Unique identifier for the message.
   */
  id: number;
  /**
   * Text content of the message.
   */
  content: string;
  /**
   * Identifier of the user who sent the message.
   */
  senderId: number;
  /**
   * Identifier of the tutoring session this message belongs to.
   */
  sessionId: number;
  /**
   * Timestamp when the message was sent.
   */
  sentAt: string;
}
