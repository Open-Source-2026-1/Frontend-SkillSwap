import { QuizQuestion } from './quiz.entity';


export interface CreateQuizRequest {
    title: string;
    course: string;
    createdBy: number;
    tutorId?: number | null;
    questions: QuizQuestion[];
}