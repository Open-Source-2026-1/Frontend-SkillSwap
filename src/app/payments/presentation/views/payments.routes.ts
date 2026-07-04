import { Routes } from '@angular/router';
import { tutorGuard } from '../../../iam/infrastructure/iam.guard';

const donate = () => import('./donate/donate').then((m) => m.Donate);
const wallet = () => import('./wallet/wallet').then((m) => m.WalletView);

export const paymentsRoutes: Routes = [
    { path: 'donate', loadComponent: donate },
    { path: 'wallet', loadComponent: wallet, canActivate: [tutorGuard] },
];