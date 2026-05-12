import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  template: `
    <h1>{{ 'about.title' | translate }}</h1>
    <p>{{ 'about.content' | translate }}</p>
  `,
  styles: []
})
export class AboutComponent {}
