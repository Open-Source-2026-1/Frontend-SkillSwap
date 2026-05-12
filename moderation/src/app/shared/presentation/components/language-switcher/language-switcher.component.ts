import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang = 'en';
  constructor(private translate: TranslateService) {}
  setLang(lang: string) { this.currentLang = lang; this.translate.use(lang); }
}
