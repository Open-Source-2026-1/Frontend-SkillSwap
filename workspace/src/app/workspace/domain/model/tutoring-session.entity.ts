import { BaseEntity } from '../../../shared/infrastructure/base-entity';
export class TutoringSession implements BaseEntity {
  private _id: number;
  private _topic: string;
  private _status: string;
  private _learnerId: number;
  private _tutorId: number;
  private _scheduledAt: string;

  constructor(session: {
    id: number;
    topic: string;
    status: string;
    learnerId: number;
    tutorId: number;
    scheduledAt: string;
  }) {
    this._id = session.id;
    this._topic = session.topic;
    this._status = session.status;
    this._learnerId = session.learnerId;
    this._tutorId = session.tutorId;
    this._scheduledAt = session.scheduledAt;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get topic(): string {
    return this._topic;
  }
  set topic(value: string) {
    this._topic = value;
  }

  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }

  get learnerId(): number {
    return this._learnerId;
  }
  set learnerId(value: number) {
    this._learnerId = value;
  }

  get tutorId(): number {
    return this._tutorId;
  }
  set tutorId(value: number) {
    this._tutorId = value;
  }

  get scheduledAt(): string {
    return this._scheduledAt;
  }
  set scheduledAt(value: string) {
    this._scheduledAt = value;
  }
}
