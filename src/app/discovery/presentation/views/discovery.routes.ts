import { Routes } from '@angular/router';
import { iamGuard, tutorGuard } from '../../../iam/infrastructure/iam.guard';

const tutorList = () =>
    import('./tutor-list/tutor-list').then((m) => m.TutorList);
const tutorDetail = () =>
    import('./tutor-detail/tutor-detail').then((m) => m.TutorDetail);
const editTutorProfile = () =>
    import('./edit-tutor-profile/edit-tutor-profile').then((m) => m.EditTutorProfile);

export const discoveryRoutes: Routes = [
    { path: 'tutors', loadComponent: tutorList, canActivate: [iamGuard] },
    { path: 'tutors/:id', loadComponent: tutorDetail, canActivate: [iamGuard] },
    { path: 'edit-profile', loadComponent: editTutorProfile, canActivate: [iamGuard, tutorGuard] },
];