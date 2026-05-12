import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'moderation',
    loadChildren: () => import('./moderation/presentation/views/moderation.routes').then(m => m.moderationRoutes)
  },
  {
    path: 'students',
    loadComponent: () => import('./students/presentation/views/student-search/student-search.component').then(m => m.StudentSearchComponent)
  },
  { path: '', redirectTo: 'moderation/reports', pathMatch: 'full' },
  { path: 'home', redirectTo: 'moderation/reports', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];
