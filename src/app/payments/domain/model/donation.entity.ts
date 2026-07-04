import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { DonationStatus } from './donation-status';

export class Donation implements BaseEntity {
    private _id: number;
    private _donorId: number;
    private _tutorId: number;
    private _sessionId: number;
    private _amount: number;
    private _netAmount: number;
    private _commission: number;
    private _currency: string;
    private _status: DonationStatus;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(donation: {
        id: number;
        donorId: number;
        tutorId: number;
        sessionId: number;
        amount: number;
        netAmount: number;
        commission: number;
        currency: string;
        status: DonationStatus;
        createdAt: string;
        updatedAt?: string;
    }) {
        this._id = donation.id;
        this._donorId = donation.donorId;
        this._tutorId = donation.tutorId;
        this._sessionId = donation.sessionId;
        this._amount = donation.amount;
        this._netAmount = donation.netAmount;
        this._commission = donation.commission;
        this._currency = donation.currency;
        this._status = donation.status;
        this._createdAt = donation.createdAt;
        this._updatedAt = donation.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get donorId(): number { return this._donorId; }
    set donorId(value: number) { this._donorId = value; }

    get tutorId(): number { return this._tutorId; }
    set tutorId(value: number) { this._tutorId = value; }

    get sessionId(): number { return this._sessionId; }
    set sessionId(value: number) { this._sessionId = value; }

    get amount(): number { return this._amount; }
    set amount(value: number) { this._amount = value; }

    get netAmount(): number { return this._netAmount; }
    set netAmount(value: number) { this._netAmount = value; }

    /** Porcentaje de comisión ( 5%) */
    get commission(): number { return this._commission; }
    set commission(value: number) { this._commission = value; }

    /** Monto de la comisión en soles — se calcula. */
    get commissionAmount(): number {
        return Math.round((this._amount - this._netAmount) * 100) / 100;
    }

    get currency(): string { return this._currency; }
    set currency(value: string) { this._currency = value; }

    get status(): DonationStatus { return this._status; }
    set status(value: DonationStatus) { this._status = value; }

    get createdAt(): string { return this._createdAt; }
    set createdAt(value: string) { this._createdAt = value; }

    get updatedAt(): string { return this._updatedAt; }
}