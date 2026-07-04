import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { Coordinator } from './shared/presentation/views/coordinator/coordinator';
import { iamGuard, moderatorGuard } from './iam/infrastructure/iam.guard';

const pageNotFound = () =>
    import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'SkillSwap';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Inicio`, canActivate: [iamGuard] },
  { path: 'coordinator', component: Coordinator, title: `${baseTitle} - Panel Coordinador`, canActivate: [moderatorGuard] },
  {
    path: 'iam',
    loadChildren: () => import('./iam/presentation/iam.routes').then((m) => m.iamRoutes),
  },
  {
    path: 'workspace',
    canActivate: [iamGuard],
    loadChildren: () =>
        import('./workspace/presentation/views/workspace.routes').then((m) => m.workspaceRoutes),
  },
  {
    path: 'discovery',
    loadChildren: () =>
        import('./discovery/presentation/views/discovery.routes').then((m) => m.discoveryRoutes),
  },
  {
    path: 'reputation',
    canActivate: [iamGuard],
    loadChildren: () =>
        import('./reputation/presentation/views/reputation.routes').then((m) => m.reputationRoutes),
  },
  {
    path: 'learning',
    canActivate: [iamGuard],
    loadChildren: () =>
        import('./learning/presentation/views/learning.routes').then((m) => m.learningRoutes),
  },
  {
    path: 'moderation',
    canActivate: [iamGuard],
    loadChildren: () =>
        import('./moderation/presentation/views/moderation.routes').then((m) => m.moderationRoutes),
  },
  {
    path: 'payments',
    canActivate: [iamGuard],
    loadChildren: () =>
        import('./payments/presentation/views/payments.routes').then((m) => m.paymentsRoutes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Not Found` },
];
