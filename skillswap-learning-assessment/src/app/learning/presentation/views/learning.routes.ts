import { Routes } from '@angular/router';

const quizList = () => import('./quiz-list/quiz-list').then((m) => m.QuizList);
const quizForm = () => import('./quiz-form/quiz-form').then((m) => m.QuizForm);
const questionList = () => import('./question-list/question-list').then((m) => m.QuestionList);
const questionForm = () => import('./question-form/question-form').then((m) => m.QuestionForm);

export const learningRoutes: Routes = [
  { path: 'quizzes', loadComponent: quizList },
  { path: 'quizzes/new', loadComponent: quizForm },
  { path: 'quizzes/edit/:id', loadComponent: quizForm },
  { path: 'quizzes/:quizId/questions', loadComponent: questionList },
  { path: 'quizzes/:quizId/questions/new', loadComponent: questionForm },
  { path: 'quizzes/:quizId/questions/edit/:id', loadComponent: questionForm },
];
