import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { ModerationStoreService } from '../../../application/moderation-store.service';

@Component({
  selector: 'app-sanction-list',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule, MatChipsModule, TranslateModule],
  templateUrl: './sanction-list.component.html',
  styleUrl: './sanction-list.component.css'
})
export class SanctionListComponent {
  readonly store  = inject(ModerationStoreService);
  readonly router = inject(Router);
  displayedColumns = ['id', 'reportId', 'sanctionedUserId', 'type', 'description', 'durationDays', 'actions'];
}
