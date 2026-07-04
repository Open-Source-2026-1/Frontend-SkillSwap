import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Review implements BaseEntity {
    private _id: number;
    private _tutorId: number;
    private _learnerId: number;
    private _learnerName: string;
    private _rating: number;
    private _comment: string;
    private _sessionId: number;
    private _createdAt: string;
    private _updatedAt: string;
    private _tutorReply: string;

    constructor(review: {
        id: number;
        tutorId: number;
        learnerId: number;
        learnerName: string;
        rating: number;
        comment: string;
        sessionId: number;
        createdAt: string;
        updatedAt?: string;
        tutorReply?: string;
    }) {
        this._id = review.id;
        this._tutorId = review.tutorId;
        this._learnerId = review.learnerId;
        this._learnerName = review.learnerName;
        this._rating = review.rating;
        this._comment = review.comment;
        this._sessionId = review.sessionId;
        this._createdAt = review.createdAt;
        this._updatedAt = review.updatedAt ?? '';
        this._tutorReply = review.tutorReply ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get tutorId(): number { return this._tutorId; }
    set tutorId(value: number) { this._tutorId = value; }

    get learnerId(): number { return this._learnerId; }
    set learnerId(value: number) { this._learnerId = value; }

    get learnerName(): string { return this._learnerName; }
    set learnerName(value: string) { this._learnerName = value; }

    get rating(): number { return this._rating; }
    set rating(value: number) { this._rating = value; }

    get comment(): string { return this._comment; }
    set comment(value: string) { this._comment = value; }

    get sessionId(): number { return this._sessionId; }
    set sessionId(value: number) { this._sessionId = value; }

    get createdAt(): string { return this._createdAt; }
    set createdAt(value: string) { this._createdAt = value; }

    get updatedAt(): string { return this._updatedAt; }

    get tutorReply(): string { return this._tutorReply; }
    set tutorReply(value: string) { this._tutorReply = value; }
}