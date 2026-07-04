import { Routes } from '@angular/router';
import { moderatorGuard } from '../../../iam/infrastructure/iam.guard';

const reportForm = () =>
    import('./report-form/report-form').then((m) => m.ReportForm);
const moderationPanel = () =>
    import('./moderation-panel/moderation-panel').then((m) => m.ModerationPanel);

export const moderationRoutes: Routes = [
    { path: 'report/new', loadComponent: reportForm },
    { path: 'panel', loadComponent: moderationPanel, canActivate: [moderatorGuard] },
];