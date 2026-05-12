import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  imports: [TranslatePipe, RouterLink, MatButton],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  currentPath = inject(Router).url;
}
