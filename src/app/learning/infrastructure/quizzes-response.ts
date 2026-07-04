import { BaseResource } from '../../shared/infrastructure/base-response';

export interface QuestionResource {
    text: string;
    options: string[];
    correctIndex: number;
}

export interface QuizResource extends BaseResource {
    id: number;
    title: string;
    course: string;
    createdBy: number;
    tutorId: number | null;
    questions: QuestionResource[];
    createdAt: string;
    updatedAt: string;
}


export interface CreateQuizResource {
    title: string;
    course: string;
    createdBy: number;
    tutorId?: number | null;
    questions: QuestionResource[];
}