import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { LearningStore } from '../../../application/learning-store';

@Component({
  selector: 'app-quiz-list',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinner, MatError],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css',
})
export class QuizList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'title', 'course', 'status', 'actions'];

  editQuiz(id: number) {
    this.router.navigate(['learning/quizzes/edit', id]).then();
  }
  deleteQuiz(id: number) {
    this.store.deleteQuiz(id);
  }
  manageQuestions(id: number) {
    this.router.navigate(['learning/quizzes', id, 'questions']).then();
  }
}
