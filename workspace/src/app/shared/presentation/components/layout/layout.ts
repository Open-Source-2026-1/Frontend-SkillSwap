import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterContent } from '../footer-content/footer-content';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

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
  /** Mock notification count — purely frontend */
  readonly notificationCount = signal<number>(2);

  /** Mock current user — purely frontend */
  readonly currentUser = signal({
    name: 'Valeria Torres',
    avatar: 'https://i.pravatar.cc/150?img=47',
    university: 'UPC',
  });

  options = [
    { link: '/workspace/my-tutors', label: 'option.my-tutors' },
    { link: '/workspace/tutoring-sessions', label: 'option.sessions' },
  ];

  logout(): void {
    // Frontend-only placeholder — no backend call
    alert('Sesión cerrada');
  }
}
