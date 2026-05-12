import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
    MatIcon,
    MatBadge,
    MatIconButton,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = [
    { link: '/home', label: 'option.home' },
    { link: '/about', label: 'option.about' },
    { link: '/payments/wallet', label: 'option.wallet' },
    { link: '/payments/donations', label: 'option.donations' },
  ];
}
