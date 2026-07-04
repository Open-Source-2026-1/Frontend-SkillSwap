import { Routes } from '@angular/router';
import { iamGuard } from '../infrastructure/iam.guard';

const signInForm = () => import('./views/sign-in-form/sign-in-form').then((m) => m.SignInForm);
const signUpForm = () => import('./views/sign-up-form/sign-up-form').then((m) => m.SignUpForm);
const verifyEmail = () => import('./views/verify-email/verify-email').then((m) => m.VerifyEmail);
const completeTutorProfile = () =>
    import('./views/complete-tutor-profile/complete-tutor-profile').then((m) => m.CompleteTutorProfile);
const becomeTutor = () => import('./views/become-tutor/become-tutor').then((m) => m.BecomeTutor);
const becomeLearner = () => import('./views/become-learner/become-learner').then((m) => m.BecomeLearner);

export const iamRoutes: Routes = [
    { path: 'sign-in', loadComponent: signInForm },
    { path: 'sign-up', loadComponent: signUpForm },
    { path: 'verify-email', loadComponent: verifyEmail, canActivate: [iamGuard] },
    { path: 'complete-tutor-profile', loadComponent: completeTutorProfile, canActivate: [iamGuard] },
    { path: 'become-tutor', loadComponent: becomeTutor, canActivate: [iamGuard] },
    { path: 'become-learner', loadComponent: becomeLearner, canActivate: [iamGuard] },
];