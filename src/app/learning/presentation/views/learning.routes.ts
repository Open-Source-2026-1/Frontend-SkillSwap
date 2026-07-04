import { Routes } from '@angular/router';
import { moderatorGuard } from '../../../iam/infrastructure/iam.guard';

const adminPanel = () =>
    import('./admin-panel/admin-panel').then((m) => m.AdminPanel);
const quizForm = () =>
    import('./quiz-form/quiz-form').then((m) => m.QuizForm);
const quizAttempt = () =>
    import('./quiz-attempt/quiz-attempt').then((m) => m.QuizAttemptView);

export const learningRoutes: Routes = [
    { path: 'admin', loadComponent: adminPanel, canActivate: [moderatorGuard] },
    { path: 'quiz-form', loadComponent: quizForm, canActivate: [moderatorGuard] },
    { path: 'quiz/:id/attempt', loadComponent: quizAttempt },
];