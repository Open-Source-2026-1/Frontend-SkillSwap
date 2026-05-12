import { Routes } from '@angular/router';

export const moderationRoutes: Routes = [
  { path: 'reports',                loadComponent: () => import('./report-list/report-list.component').then(m => m.ReportListComponent) },
  { path: 'reports/new',            loadComponent: () => import('./report-form/report-form.component').then(m => m.ReportFormComponent) },
  { path: 'reports/edit/:id',       loadComponent: () => import('./report-form/report-form.component').then(m => m.ReportFormComponent) },
  { path: 'reports/chat/:userId',   loadComponent: () => import('./report-chat/report-chat.component').then(m => m.ReportChatComponent) },
  { path: 'sanctions',              loadComponent: () => import('./sanction-list/sanction-list.component').then(m => m.SanctionListComponent) },
  { path: 'sanctions/new',          loadComponent: () => import('./sanction-form/sanction-form.component').then(m => m.SanctionFormComponent) },
  { path: 'sanctions/edit/:id',     loadComponent: () => import('./sanction-form/sanction-form.component').then(m => m.SanctionFormComponent) },
  { path: '', redirectTo: 'reports', pathMatch: 'full' }
];
