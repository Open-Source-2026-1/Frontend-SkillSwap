import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Favorite implements BaseEntity {
    private _id: number;
    private _learnerId: number;
    private _tutorId: number;
    private _createdAt: string;

    constructor(favorite: {
        id: number;
        learnerId: number;
        tutorId: number;
        createdAt: string;
    }) {
        this._id = favorite.id;
        this._learnerId = favorite.learnerId;
        this._tutorId = favorite.tutorId;
        this._createdAt = favorite.createdAt;
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get learnerId(): number { return this._learnerId; }
    set learnerId(value: number) { this._learnerId = value; }

    get tutorId(): number { return this._tutorId; }
    set tutorId(value: number) { this._tutorId = value; }

    get createdAt(): string { return this._createdAt; }
}