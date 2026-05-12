import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Sanction implements BaseEntity {
  private _id: number;
  private _reportId: number;
  private _sanctionedUserId: number;
  private _type: string;
  private _description: string;
  private _durationDays: number;
  private _createdAt: Date;

  constructor(sanction: {
    id: number;
    reportId: number;
    sanctionedUserId: number;
    type: string;
    description: string;
    durationDays: number;
    createdAt: string;
  }) {
    this._id               = sanction.id;
    this._reportId         = sanction.reportId;
    this._sanctionedUserId = sanction.sanctionedUserId;
    this._type             = sanction.type;
    this._description      = sanction.description;
    this._durationDays     = sanction.durationDays;
    this._createdAt        = new Date(sanction.createdAt);
  }

  get id(): number                    { return this._id; }
  set id(value: number)               { this._id = value; }

  get reportId(): number              { return this._reportId; }
  set reportId(value: number)         { this._reportId = value; }

  get sanctionedUserId(): number        { return this._sanctionedUserId; }
  set sanctionedUserId(value: number)   { this._sanctionedUserId = value; }

  get type(): string                  { return this._type; }
  set type(value: string)             { this._type = value; }

  get description(): string           { return this._description; }
  set description(value: string)      { this._description = value; }

  get durationDays(): number          { return this._durationDays; }
  set durationDays(value: number)     { this._durationDays = value; }

  get createdAt(): Date               { return this._createdAt; }
  set createdAt(value: Date)          { this._createdAt = value; }

  isBan(): boolean { return this._type === 'ban'; }
}
