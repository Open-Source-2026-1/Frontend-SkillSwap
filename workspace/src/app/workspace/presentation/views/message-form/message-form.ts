import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { Message } from '../../../domain/model/message.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './message-form.html',
  styleUrl: './message-form.css',
})
export class MessageForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(WorkspaceStore);

  /** sessionId viene como query param desde session-detail */
  private sessionId: number = +(this.route.snapshot.queryParamMap.get('sessionId') ?? 0);

  form = this.fb.group({
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit(): void {
    if (this.form.invalid) return;
    const message = new Message({
      id: 0,
      content: this.form.value.content!,
      senderId: 101, // mock: usuario actual
      sessionId: this.sessionId,
      sentAt: new Date().toISOString().slice(0, 16),
    });
    this.store.addMessage(message);

    // Regresa al detalle de la sesión de donde vino
    if (this.sessionId) {
      this.router.navigate(['workspace/tutoring-sessions', this.sessionId]).then();
    } else {
      this.router.navigate(['workspace/tutoring-sessions']).then();
    }
  }

  goBack(): void {
    if (this.sessionId) {
      this.router.navigate(['workspace/tutoring-sessions', this.sessionId]).then();
    } else {
      this.router.navigate(['workspace/tutoring-sessions']).then();
    }
  }
}
