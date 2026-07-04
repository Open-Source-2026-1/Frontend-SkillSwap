import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { QuizAttemptStatus } from './quiz-attempt-status';

export class QuizAttempt implements BaseEntity {
    private _id: number;
    private _quizId: number;
    private _learnerId: number;
    private _sessionId: number;
    private _answers: number[];
    private _score: number;
    private _status: QuizAttemptStatus;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(attempt: {
        id: number;
        quizId: number;
        learnerId: number;
        sessionId: number;
        answers: number[];
        score: number;
        status: QuizAttemptStatus;
        createdAt: string;
        updatedAt?: string;
    }) {
        this._id = attempt.id;
        this._quizId = attempt.quizId;
        this._learnerId = attempt.learnerId;
        this._sessionId = attempt.sessionId;
        this._answers = attempt.answers;
        this._score = attempt.score;
        this._status = attempt.status;
        this._createdAt = attempt.createdAt;
        this._updatedAt = attempt.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get quizId(): number { return this._quizId; }
    set quizId(value: number) { this._quizId = value; }

    get learnerId(): number { return this._learnerId; }
    set learnerId(value: number) { this._learnerId = value; }

    get sessionId(): number { return this._sessionId; }
    set sessionId(value: number) { this._sessionId = value; }

    get answers(): number[] { return this._answers; }
    set answers(value: number[]) { this._answers = value; }

    /** Escala 0-10, calculada por el backend — el front nunca la manda. */
    get score(): number { return this._score; }
    set score(value: number) { this._score = value; }

    get status(): QuizAttemptStatus { return this._status; }
    set status(value: QuizAttemptStatus) { this._status = value; }

    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }
}