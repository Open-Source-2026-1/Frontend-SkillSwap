import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { LearningStore } from '../../../application/learning-store';

@Component({
  selector: 'app-question-list',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinner, MatError],
  templateUrl: './question-list.html',
  styleUrl: './question-list.css',
})
export class QuestionList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  quizId = +this.route.snapshot.params['quizId'];
  questions = this.store.getQuestionsByQuizId(this.quizId);

  displayedColumns: string[] = ['id', 'text', 'correctOption', 'actions'];

  editQuestion(id: number) {
    this.router.navigate(['learning/quizzes', this.quizId, 'questions/edit', id]).then();
  }
  deleteQuestion(id: number) {
    this.store.deleteQuestion(id);
  }
}
