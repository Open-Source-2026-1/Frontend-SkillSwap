import { BaseEntity } from '../../../shared/infrastructure/base-entity';

/** Una pregunta de opción múltiple. Sin id propio: el backend la guarda como
 *  elemento embebido dentro del Quiz (@ElementCollection), no como entidad aparte. */
export interface QuizQuestion {
    text: string;
    options: string[];
    correctIndex: number;
}

export class Quiz implements BaseEntity {
    private _id: number;
    private _title: string;
    private _course: string;
    private _createdBy: number;
    private _tutorId: number | null;
    private _questions: QuizQuestion[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor(quiz: {
        id: number;
        title: string;
        course: string;
        createdBy: number;
        tutorId?: number | null;
        questions: QuizQuestion[];
        createdAt: string;
        updatedAt?: string;
    }) {
        this._id = quiz.id;
        this._title = quiz.title;
        this._course = quiz.course;
        this._createdBy = quiz.createdBy;
        this._tutorId = quiz.tutorId ?? null;
        this._questions = quiz.questions;
        this._createdAt = quiz.createdAt;
        this._updatedAt = quiz.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get title(): string { return this._title; }
    set title(value: string) { this._title = value; }

    get course(): string { return this._course; }
    set course(value: string) { this._course = value; }

    get createdBy(): number { return this._createdBy; }
    set createdBy(value: number) { this._createdBy = value; }

    /** Null cuando el quiz lo creó un moderador (no tiene perfil de tutor). */
    get tutorId(): number | null { return this._tutorId; }
    set tutorId(value: number | null) { this._tutorId = value; }

    get questions(): QuizQuestion[] { return this._questions; }
    set questions(value: QuizQuestion[]) { this._questions = value; }

    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }
}