import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LearningStore } from '../../../application/learning-store';
import { Question } from '../../../domain/model/question.entity';

@Component({
  selector: 'app-question-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './question-form.html',
  styleUrl: './question-form.css',
})
export class QuestionForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(LearningStore);

  quizId = +this.route.snapshot.params['quizId'];

  form = this.fb.group({
    text: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    optionA: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    optionB: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    optionC: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    optionD: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    correctOption: new FormControl<string>('A', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isEdit = false;
  questionId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.questionId;
      if (this.isEdit) {
        const question = this.store.questions().find((q) => q.id === this.questionId);
        if (question) {
          this.form.patchValue({
            text: question.text,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctOption: question.correctOption,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const question: Question = new Question({
      id: this.questionId ?? 0,
      quizId: this.quizId,
      text: this.form.value.text!,
      optionA: this.form.value.optionA!,
      optionB: this.form.value.optionB!,
      optionC: this.form.value.optionC!,
      optionD: this.form.value.optionD!,
      correctOption: this.form.value.correctOption!,
    });
    if (this.isEdit) {
      this.store.updateQuestion(question);
    } else {
      this.store.addQuestion(question);
    }
    this.router.navigate(['learning/quizzes', this.quizId, 'questions']).then();
  }
}
