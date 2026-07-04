import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Wallet implements BaseEntity {
    private _id: number;
    private _tutorId: number;
    private _balance: number;
    private _currency: string;
    private _bankName: string;
    private _accountNumber: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(wallet: {
        id: number;
        tutorId: number;
        balance: number;
        currency: string;
        bankName: string;
        accountNumber: string;
        createdAt?: string;
        updatedAt?: string;
    }) {
        this._id = wallet.id;
        this._tutorId = wallet.tutorId;
        this._balance = wallet.balance;
        this._currency = wallet.currency;
        this._bankName = wallet.bankName;
        this._accountNumber = wallet.accountNumber;
        this._createdAt = wallet.createdAt ?? '';
        this._updatedAt = wallet.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get tutorId(): number { return this._tutorId; }
    set tutorId(value: number) { this._tutorId = value; }

    get balance(): number { return this._balance; }
    set balance(value: number) { this._balance = value; }

    get currency(): string { return this._currency; }
    set currency(value: string) { this._currency = value; }

    get bankName(): string { return this._bankName; }
    set bankName(value: string) { this._bankName = value; }

    get accountNumber(): string { return this._accountNumber; }
    set accountNumber(value: string) { this._accountNumber = value; }

    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }
}