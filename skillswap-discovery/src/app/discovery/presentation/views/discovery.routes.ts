import { Routes } from '@angular/router';

const tutorList = () => import('./tutor-list/tutor-list').then((m) => m.TutorList);
const tutorForm = () => import('./tutor-form/tutor-form').then((m) => m.TutorForm);

export const discoveryRoutes: Routes = [
  { path: 'tutors', loadComponent: tutorList },
  { path: 'tutors/new', loadComponent: tutorForm },
  { path: 'tutors/edit/:id', loadComponent: tutorForm },
];
