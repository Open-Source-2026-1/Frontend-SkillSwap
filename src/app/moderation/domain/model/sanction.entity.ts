import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type SanctionType = 'warning' | 'block' | 'suspension';

export class Sanction implements BaseEntity {
    private _id: number;
    private _reportId: number;
    private _sanctionedUserId: number;
    private _type: SanctionType;
    private _description: string;
    private _durationDays: number;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(sanction: {
        id: number;
        reportId: number;
        sanctionedUserId: number;
        type: SanctionType;
        description: string;
        durationDays: number;
        createdAt: string;
        updatedAt?: string;
    }) {
        this._id = sanction.id;
        this._reportId = sanction.reportId;
        this._sanctionedUserId = sanction.sanctionedUserId;
        this._type = sanction.type;
        this._description = sanction.description;
        this._durationDays = sanction.durationDays;
        this._createdAt = sanction.createdAt;
        this._updatedAt = sanction.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get reportId(): number { return this._reportId; }
    set reportId(value: number) { this._reportId = value; }

    get sanctionedUserId(): number { return this._sanctionedUserId; }
    set sanctionedUserId(value: number) { this._sanctionedUserId = value; }

    get type(): SanctionType { return this._type; }
    set type(value: SanctionType) { this._type = value; }

    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }

    /** El backend no guarda una fecha, guarda cuántos días dura (0 = sin vencimiento, ej. advertencias). */
    get durationDays(): number { return this._durationDays; }
    set durationDays(value: number) { this._durationDays = value; }

    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }

    /** Calculada en cliente: el backend no expone una fecha de expiración directa. */
    get expiresAt(): string {
        if (this._durationDays <= 0 || !this._createdAt) return '';
        const date = new Date(this._createdAt);
        date.setDate(date.getDate() + this._durationDays);
        return date.toISOString().slice(0, 10);
    }
}