import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Quiz } from '../domain/model/quiz.entity';
import { QuizAttempt } from '../domain/model/quiz-attempt.entity';
import { CreateQuizRequest } from '../domain/model/create-quiz.request';
import { CreateQuizAttemptRequest } from '../domain/model/create-quiz-attempt.request';
import { QuizzesApiEndpoint } from './quizzes-api-endpoint';
import { QuizAttemptsApiEndpoint } from './quiz-attempts-api-endpoint';

@Injectable({
    providedIn: 'root',
})
export class LearningApi extends BaseApi {
    private readonly quizzesEndpoint: QuizzesApiEndpoint;
    private readonly attemptsEndpoint: QuizAttemptsApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.quizzesEndpoint = new QuizzesApiEndpoint(http);
        this.attemptsEndpoint = new QuizAttemptsApiEndpoint(http);
    }

    // --- Quizzes ---
    getQuizzes(): Observable<Quiz[]> {
        return this.quizzesEndpoint.getAll();
    }

    createQuiz(request: CreateQuizRequest): Observable<Quiz> {
        return this.quizzesEndpoint.create(request);
    }

    deleteQuiz(id: number): Observable<void> {
        return this.quizzesEndpoint.delete(id);
    }

    // --- Attempts ---
    getMyAttempts(learnerId: number): Observable<QuizAttempt[]> {
        return this.attemptsEndpoint.getByLearnerId(learnerId);
    }

    startAttempt(request: CreateQuizAttemptRequest): Observable<QuizAttempt> {
        return this.attemptsEndpoint.create(request);
    }

    completeAttempt(attemptId: number, answers: number[]): Observable<QuizAttempt> {
        return this.attemptsEndpoint.complete(attemptId, answers);
    }
}