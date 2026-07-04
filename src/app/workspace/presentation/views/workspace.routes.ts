import { Routes } from '@angular/router';

const tutoringSessionList = () =>
    import('./tutoring-session-list/tutoring-session-list').then((m) => m.TutoringSessionList);
const tutoringSessionForm = () =>
    import('./tutoring-session-form/tutoring-session-form').then((m) => m.TutoringSessionForm);
const sessionDetail = () => import('./session-detail/session-detail').then((m) => m.SessionDetail);
const myTutors = () => import('./my-tutors/my-tutors').then((m) => m.MyTutors);

export const workspaceRoutes: Routes = [
  { path: 'tutoring-sessions', loadComponent: tutoringSessionList },
  { path: 'tutoring-sessions/new', loadComponent: tutoringSessionForm },
  { path: 'tutoring-sessions/:id', loadComponent: sessionDetail },
  { path: 'my-tutors', loadComponent: myTutors },
];