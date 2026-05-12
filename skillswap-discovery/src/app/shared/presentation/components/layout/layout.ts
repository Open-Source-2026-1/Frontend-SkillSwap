import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIconModule,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = [
    { link: '/home', label: 'option.home' },
    { link: '/about', label: 'option.about' },
    { link: '/discovery/tutors', label: 'option.tutors' },
  ];
}
