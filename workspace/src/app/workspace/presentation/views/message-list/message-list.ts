import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { LearningStore } from '../../../application/workspace-store';
import { Router } from '@angular/router';
import { MatError } from '@angular/material/form-field';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WorkspaceStore } from '../../../application/workspace-store';
@Component({
  selector: 'app-message-list',
  imports: [
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
  ],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  readonly store = inject(WorkspaceStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'content', 'senderId', 'session', 'sentAt', 'actions'];

  editMessage(id: number) {
    this.router.navigate(['workspace/messages/edit', id]).then();
  }

  deleteMessage(id: number) {
    this.store.deleteMessage(id);
  }
}
