import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LearningStore } from '../../../application/learning-store';
import { Quiz } from '../../../domain/model/quiz.entity';

@Component({
  selector: 'app-quiz-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './quiz-form.html',
  styleUrl: './quiz-form.css',
})
export class QuizForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(LearningStore);

  form = this.fb.group({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    course: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<string>('draft', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    professorId: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isEdit = false;
  quizId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.quizId;
      if (this.isEdit) {
        const quiz = this.store.quizzes().find((q) => q.id === this.quizId);
        if (quiz) {
          this.form.patchValue({
            title: quiz.title,
            course: quiz.course,
            status: quiz.status,
            professorId: quiz.professorId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const quiz: Quiz = new Quiz({
      id: this.quizId ?? 0,
      title: this.form.value.title!,
      course: this.form.value.course!,
      status: this.form.value.status!,
      professorId: this.form.value.professorId!,
    });
    if (this.isEdit) {
      this.store.updateQuiz(quiz);
    } else {
      this.store.addQuiz(quiz);
    }
    this.router.navigate(['learning/quizzes']).then();
  }
}
