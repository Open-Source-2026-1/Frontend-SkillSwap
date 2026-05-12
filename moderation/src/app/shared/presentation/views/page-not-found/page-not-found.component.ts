import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, TranslateModule, MatButtonModule],
  template: `
    <h1>{{ 'page-not-found.title' | translate }}</h1>
    <p [innerHTML]="'page-not-found.content' | translate"></p>
    <a mat-raised-button color="primary" routerLink="/home">
      {{ 'page-not-found.go-home' | translate }}
    </a>
  `,
  styles: []
})
export class PageNotFoundComponent {}
