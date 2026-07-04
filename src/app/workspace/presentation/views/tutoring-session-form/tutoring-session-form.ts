import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkspaceStore } from '../../../application/workspace-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';
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
  private router = inject(Router);
  private store = inject(WorkspaceStore);
  readonly discoveryStore = inject(DiscoveryStore);

  readonly levelOptions = [
    { value: 'basico', label: '🟢 Básico — recién empiezo el tema' },
    { value: 'intermedio', label: '🟡 Intermedio — tengo base pero tengo dudas' },
    { value: 'avanzado', label: '🔴 Avanzado — necesito profundizar' },
  ];

  form = this.fb.group({
    tutorId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    topic: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    scheduledAt: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    studentLevel: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl<string>('', { nonNullable: true }),
  });

  submit(): void {
    if (this.form.invalid) return;
    this.store.requestTutoringSession({
      learnerId: CURRENT_LEARNER_ID(),
      tutorId: this.form.value.tutorId!,
      topic: this.form.value.topic!,
      message: this.form.value.message ?? '',
      studentLevel: this.form.value.studentLevel!,
      scheduledAt: this.form.value.scheduledAt!,
    });
    this.router.navigate(['workspace/tutoring-sessions']).then();
  }
}
