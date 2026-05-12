import { Routes } from '@angular/router';

const donationList = () => import('./donation-list/donation-list').then((m) => m.DonationList);
const donationForm = () => import('./donation-form/donation-form').then((m) => m.DonationForm);
const walletOverview = () =>
  import('./wallet-overview/wallet-overview').then((m) => m.WalletOverview);

export const paymentsRoutes: Routes = [
  { path: 'donations', loadComponent: donationList },
  { path: 'donations/new', loadComponent: donationForm },
  { path: 'donations/edit/:id', loadComponent: donationForm },
  { path: 'wallet', loadComponent: walletOverview },
];
