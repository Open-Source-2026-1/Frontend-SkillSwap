import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { SessionStatus } from './session-status';

export class TutoringSession implements BaseEntity {
  private _id: number;
  private _topic: string;
  private _status: SessionStatus;
  private _learnerId: number;
  private _tutorId: number;
  private _scheduledAt: string;
  private _message: string;
  private _studentLevel: string;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(session: {
    id: number;
    topic: string;
    status: SessionStatus;
    learnerId: number;
    tutorId: number;
    scheduledAt: string;
    message?: string;
    studentLevel?: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this._id = session.id;
    this._topic = session.topic;
    this._status = session.status;
    this._learnerId = session.learnerId;
    this._tutorId = session.tutorId;
    this._scheduledAt = session.scheduledAt;
    this._message = session.message ?? '';
    this._studentLevel = session.studentLevel ?? '';
    this._createdAt = session.createdAt ?? '';
    this._updatedAt = session.updatedAt ?? '';
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get topic(): string { return this._topic; }
  set topic(value: string) { this._topic = value; }

  get status(): SessionStatus { return this._status; }
  set status(value: SessionStatus) { this._status = value; }

  get learnerId(): number { return this._learnerId; }
  set learnerId(value: number) { this._learnerId = value; }

  get tutorId(): number { return this._tutorId; }
  set tutorId(value: number) { this._tutorId = value; }

  get scheduledAt(): string { return this._scheduledAt; }
  set scheduledAt(value: string) { this._scheduledAt = value; }

  get message(): string { return this._message; }
  set message(value: string) { this._message = value; }

  get studentLevel(): string { return this._studentLevel; }
  set studentLevel(value: string) { this._studentLevel = value; }

  get createdAt(): string { return this._createdAt; }
  get updatedAt(): string { return this._updatedAt; }
}