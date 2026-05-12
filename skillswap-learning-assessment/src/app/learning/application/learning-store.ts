import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Quiz } from '../domain/model/quiz.entity';
import { Question } from '../domain/model/question.entity';
import { LearningApi } from '../infrastructure/learning-api';

@Injectable({ providedIn: 'root' })
export class LearningStore {
  private readonly quizzesSignal = signal<Quiz[]>([]);
  private readonly questionsSignal = signal<Question[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly quizzes = this.quizzesSignal.asReadonly();
  readonly questions = this.questionsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly quizCount = computed(() => this.quizzes().length);
  readonly questionCount = computed(() => this.questions().length);

  constructor(private learningApi: LearningApi) {
    this.loadQuizzes();
    this.loadQuestions();
  }

  getQuestionsByQuizId(quizId: number) {
    return computed(() => this.questions().filter((q) => q.quizId === quizId));
  }

  addQuiz(quiz: Quiz): void {
    this.loadingSignal.set(true);
    this.learningApi
      .createQuiz(quiz)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.quizzesSignal.update((quizzes) => [...quizzes, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  updateQuiz(quiz: Quiz): void {
    this.loadingSignal.set(true);
    this.learningApi
      .updateQuiz(quiz)
      .pipe(retry(2))
      .subscribe({
        next: (updated) => {
          this.quizzesSignal.update((quizzes) =>
            quizzes.map((q) => (q.id === updated.id ? updated : q)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  deleteQuiz(id: number): void {
    this.loadingSignal.set(true);
    this.learningApi
      .deleteQuiz(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.quizzesSignal.update((quizzes) => quizzes.filter((q) => q.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  addQuestion(question: Question): void {
    this.loadingSignal.set(true);
    this.learningApi
      .createQuestion(question)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.questionsSignal.update((questions) => [...questions, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  updateQuestion(question: Question): void {
    this.loadingSignal.set(true);
    this.learningApi
      .updateQuestion(question)
      .pipe(retry(2))
      .subscribe({
        next: (updated) => {
          this.questionsSignal.update((questions) =>
            questions.map((q) => (q.id === updated.id ? updated : q)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  deleteQuestion(id: number): void {
    this.loadingSignal.set(true);
    this.learningApi
      .deleteQuestion(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.questionsSignal.update((questions) => questions.filter((q) => q.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  private loadQuizzes(): void {
    this.loadingSignal.set(true);
    this.learningApi
      .getQuizzes()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (quizzes) => {
          this.quizzesSignal.set(quizzes);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  private loadQuestions(): void {
    this.loadingSignal.set(true);
    this.learningApi
      .getQuestions()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (questions) => {
          this.questionsSignal.set(questions);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }
}
