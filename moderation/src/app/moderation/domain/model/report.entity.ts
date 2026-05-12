import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Report implements BaseEntity {
  private _id: number;
  private _reportedUserId: number;
  private _reporterUserId: number;
  private _reason: string;
  private _status: string;
  private _closed: boolean;
  private _createdAt: Date;

  constructor(report: {
    id: number;
    reportedUserId: number;
    reporterUserId: number;
    reason: string;
    status: string;
    closed?: boolean;
    createdAt: string;
  }) {
    this._id             = report.id;
    this._reportedUserId = report.reportedUserId;
    this._reporterUserId = report.reporterUserId;
    this._reason         = report.reason;
    this._status         = report.status;
    this._closed         = report.closed ?? false;
    this._createdAt      = new Date(report.createdAt);
  }

  get id(): number            { return this._id; }
  set id(value: number)       { this._id = value; }

  get reportedUserId(): number        { return this._reportedUserId; }
  set reportedUserId(value: number)   { this._reportedUserId = value; }

  get reporterUserId(): number        { return this._reporterUserId; }
  set reporterUserId(value: number)   { this._reporterUserId = value; }

  get reason(): string        { return this._reason; }
  set reason(value: string)   { this._reason = value; }

  get status(): string        { return this._status; }
  set status(value: string)   { this._status = value; }

  get closed(): boolean       { return this._closed; }
  set closed(value: boolean)  { this._closed = value; }

  get createdAt(): Date       { return this._createdAt; }
  set createdAt(value: Date)  { this._createdAt = value; }

  getFormattedCreatedAt(): string {
    return this._createdAt.toLocaleDateString('es-PE', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  }

  isPending(): boolean { return this._status === 'pending'; }
}
