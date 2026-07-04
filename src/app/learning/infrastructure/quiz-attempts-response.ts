import { BaseResource } from '../../shared/infrastructure/base-response';

export interface QuizAttemptResource extends BaseResource {
    id: number;
    quizId: number;
    learnerId: number;
    sessionId: number;
    answers: number[];
    score: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateQuizAttemptResource {
    quizId: number;
    learnerId: number;
    sessionId: number;
}


export interface CompleteQuizAttemptResource {
    answers: number[];
}