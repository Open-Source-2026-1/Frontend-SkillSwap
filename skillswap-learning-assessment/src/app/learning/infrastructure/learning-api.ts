import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Quiz } from '../domain/model/quiz.entity';
import { Question } from '../domain/model/question.entity';
import { QuizzesApiEndpoint } from './quizzes-api-endpoint';
import { QuestionsApiEndpoint } from './questions-api-endpoint';

@Injectable({ providedIn: 'root' })
export class LearningApi extends BaseApi {
  private readonly quizzesEndpoint: QuizzesApiEndpoint;
  private readonly questionsEndpoint: QuestionsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.quizzesEndpoint = new QuizzesApiEndpoint(http);
    this.questionsEndpoint = new QuestionsApiEndpoint(http);
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.quizzesEndpoint.getAll();
  }
  getQuiz(id: number): Observable<Quiz> {
    return this.quizzesEndpoint.getById(id);
  }
  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.quizzesEndpoint.create(quiz);
  }
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.quizzesEndpoint.update(quiz, quiz.id);
  }
  deleteQuiz(id: number): Observable<void> {
    return this.quizzesEndpoint.delete(id);
  }

  getQuestions(): Observable<Question[]> {
    return this.questionsEndpoint.getAll();
  }
  getQuestion(id: number): Observable<Question> {
    return this.questionsEndpoint.getById(id);
  }
  createQuestion(question: Question): Observable<Question> {
    return this.questionsEndpoint.create(question);
  }
  updateQuestion(question: Question): Observable<Question> {
    return this.questionsEndpoint.update(question, question.id);
  }
  deleteQuestion(id: number): Observable<void> {
    return this.questionsEndpoint.delete(id);
  }
}
