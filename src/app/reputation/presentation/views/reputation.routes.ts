import { Routes } from '@angular/router';
import { tutorGuard } from '../../../iam/infrastructure/iam.guard';

const myProfile = () =>
    import('./my-profile/my-profile').then((m) => m.MyProfile);
const reviewForm = () =>
    import('./review-form/review-form').then((m) => m.ReviewForm);

export const reputationRoutes: Routes = [
    { path: 'my-profile', loadComponent: myProfile, canActivate: [tutorGuard] },
    { path: 'review/new', loadComponent: reviewForm },
];