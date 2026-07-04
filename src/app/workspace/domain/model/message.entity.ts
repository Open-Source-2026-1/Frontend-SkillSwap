import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { TutoringSession } from './tutoring-session.entity';
export class Message implements BaseEntity {
  private _id: number;
  private _content: string;
  private _senderId: number;
  private _sessionId: number;
  private _sentAt: string;
  private _session: TutoringSession | null;

  /**
   * Creates a new instance of the Message class.
   *
   * @param message - An object containing properties to initialize the message.
   * @param message.id - The unique identifier for the message.
   * @param message.content - The text content of the message.
   * @param message.senderId - The identifier of the sender.
   * @param message.sessionId - The identifier of the tutoring session.
   * @param message.sentAt - The timestamp when the message was sent.
   * @param message.session - (Optional) The tutoring session associated with the message.
   */
  constructor(message: {
    id: number;
    content: string;
    senderId: number;
    sessionId: number;
    sentAt: string;
    session?: TutoringSession | null;
  }) {
    this._id = message.id;
    this._content = message.content;
    this._senderId = message.senderId;
    this._sessionId = message.sessionId;
    this._sentAt = message.sentAt;
    this._session = message.session ?? null;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }

  get senderId(): number {
    return this._senderId;
  }
  set senderId(value: number) {
    this._senderId = value;
  }

  get sessionId(): number {
    return this._sessionId;
  }
  set sessionId(value: number) {
    this._sessionId = value;
  }

  get sentAt(): string {
    return this._sentAt;
  }
  set sentAt(value: string) {
    this._sentAt = value;
  }

  /**
   * The tutoring session associated with the message.
   */
  get session(): TutoringSession | null {
    return this._session;
  }
  set session(value: TutoringSession | null) {
    this._session = value;
  }
}
