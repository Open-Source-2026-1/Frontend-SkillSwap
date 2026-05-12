import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Donation implements BaseEntity {
  private _id: number;
  private _amount: number;
  private _commissionFee: number;
  private _netAmount: number;
  private _stripeTransactionId: string;
  private _tutorId: number;
  private _sessionId: number;

  constructor(donation: {
    id: number;
    amount: number;
    commissionFee: number;
    netAmount: number;
    stripeTransactionId: string;
    tutorId: number;
    sessionId: number;
  }) {
    this._id = donation.id;
    this._amount = donation.amount;
    this._commissionFee = donation.commissionFee;
    this._netAmount = donation.netAmount;
    this._stripeTransactionId = donation.stripeTransactionId;
    this._tutorId = donation.tutorId;
    this._sessionId = donation.sessionId;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get amount(): number {
    return this._amount;
  }
  set amount(value: number) {
    this._amount = value;
  }

  get commissionFee(): number {
    return this._commissionFee;
  }
  set commissionFee(value: number) {
    this._commissionFee = value;
  }

  get netAmount(): number {
    return this._netAmount;
  }
  set netAmount(value: number) {
    this._netAmount = value;
  }

  get stripeTransactionId(): string {
    return this._stripeTransactionId;
  }
  set stripeTransactionId(value: string) {
    this._stripeTransactionId = value;
  }

  get tutorId(): number {
    return this._tutorId;
  }
  set tutorId(value: number) {
    this._tutorId = value;
  }

  get sessionId(): number {
    return this._sessionId;
  }
  set sessionId(value: number) {
    this._sessionId = value;
  }

  /**
   * Processes the payment. Returns true if netAmount > 0.
   */
  processPayment(): boolean {
    return this._netAmount > 0;
  }
}
