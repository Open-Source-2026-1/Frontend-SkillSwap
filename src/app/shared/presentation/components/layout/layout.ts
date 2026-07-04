import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterContent } from '../footer-content/footer-content';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ModerationStore } from '../../../../moderation/application/moderation-store';
import { PaymentsStore } from '../../../../payments/application/payments-store';
import { IamStore } from '../../../../iam/application/iam-store';


@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    MatIconButton,
    TranslatePipe,
    FooterContent,
    MatIcon,
    MatBadge,
    LanguageSwitcher,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private router = inject(Router);
  readonly iamStore = inject(IamStore);

  readonly notificationCount = signal<number>(2);
  readonly moderationStore = inject(ModerationStore);
  readonly paymentsStore = inject(PaymentsStore);

  /** Ya no es un mock: sale del usuario real logueado en IamStore. */
  readonly currentUser = computed(() => {
    const user = this.iamStore.currentUser();
    if (!user) {
      return { name: '', avatar: 'https://i.pravatar.cc/150', subtitle: '', verified: false };
    }
    const roleLabels = user.roles.map((r) => (r === 'ROLE_TUTOR' ? 'Tutor' : 'Aprendiz'));
    return {
      name: user.fullName,
      avatar: `https://i.pravatar.cc/150?u=${user.username}`,
      subtitle: roleLabels.join(' · '),
      verified: user.verified,
    };
  });

  /** Solo aprendices que todavía no son tutores ven la opción de "convertirse en tutor". */
  readonly canBecomeTutor = computed(
      () => this.iamStore.isLearner() && !this.iamStore.isTutor(),
  );

  /** Camino inverso: tutor que todavía no es aprendiz. */
  readonly canBecomeLearner = computed(
      () => this.iamStore.isTutor() && !this.iamStore.isLearner(),
  );

  options = [
    {link: '/home', label: 'Home'},
    { link: '/workspace/my-tutors', label: 'option.my-tutors' },
    { link: '/workspace/tutoring-sessions', label: 'option.sessions' },
  ];

  navigateToDiscovery(): void {
    this.router.navigate(['/discovery/tutors']).then();
  }

  navigateToProfile(): void {
    this.router.navigate(['/reputation/my-profile']).then();
  }

  navigateToModeration(): void {
    this.router.navigate(['/moderation/panel']).then();
  }

  navigateToWallet(): void {
    this.router.navigate(['/payments/wallet']).then();
  }

  navigateToBecomeTutor(): void {
    this.router.navigate(['/iam/become-tutor']).then();
  }

  navigateToBecomeLearner(): void {
    this.router.navigate(['/iam/become-learner']).then();
  }

  logout(): void {
    this.iamStore.signOut();
    this.router.navigate(['/iam/sign-in']).then();
  }
  goHome(): void {
    this.router.navigate(['/home']).then();
  }
}