import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'SkillSwap';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  {
    path: 'workspace',
    loadChildren: () =>
      import('./workspace/presentation/views/workspace.routes').then((m) => m.workspaceRoutes),
  },
  { path: '', redirectTo: '/workspace/tutoring-sessions', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Not Found` },
];
