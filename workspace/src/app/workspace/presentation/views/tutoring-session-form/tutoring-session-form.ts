import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { TutoringSession } from '../../../domain/model/tutoring-session.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-tutoring-session-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './tutoring-session-form.html',
  styleUrl: './tutoring-session-form.css',
})
export class TutoringSessionForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(WorkspaceStore);

  form = this.fb.group({
    topic: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<string>('pending', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    learnerId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    tutorId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    scheduledAt: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  statusOptions: string[] = ['pending', 'scheduled', 'completed', 'rejected'];
  isEdit = false;
  sessionId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.sessionId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.sessionId;
      if (this.isEdit) {
        const session = this.store.getTutoringSessionById(this.sessionId)();
        if (session) {
          this.form.patchValue({
            topic: session.topic,
            status: session.status,
            learnerId: session.learnerId,
            tutorId: session.tutorId,
            scheduledAt: session.scheduledAt,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const session: TutoringSession = new TutoringSession({
      id: this.sessionId ?? 0,
      topic: this.form.value.topic!,
      status: this.form.value.status!,
      learnerId: this.form.value.learnerId!,
      tutorId: this.form.value.tutorId!,
      scheduledAt: this.form.value.scheduledAt!,
    });
    if (this.isEdit) {
      this.store.updateTutoringSession(session);
    } else {
      this.store.addTutoringSession(session);
    }
    this.router.navigate(['workspace/tutoring-sessions']).then();
  }
}
