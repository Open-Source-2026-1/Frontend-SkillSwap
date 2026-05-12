import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { computed, signal } from '@angular/core';
import { DiscoveryStore } from '../../../application/discovery-store';
import { Tutor } from '../../../domain/model/tutor.entity';

@Component({
  selector: 'app-tutor-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinner,
    MatError,
  ],
  templateUrl: './tutor-list.html',
  styleUrl: './tutor-list.css',
})
export class TutorList {
  readonly store = inject(DiscoveryStore);
  protected router = inject(Router);

  searchKeyword = signal('');
  filterRating = signal<number | null>(null);
  filterUniversity = signal('');

  displayedColumns: string[] = ['name', 'university', 'course', 'rating', 'actions'];

  universities = computed(() => [...new Set(this.store.tutors().map((t: Tutor) => t.university))]);

  filteredTutors = computed(() => {
    let list: Tutor[] = this.store.tutors();
    const kw = this.searchKeyword().toLowerCase();
    if (kw)
      list = list.filter(
        (t) => t.course.toLowerCase().includes(kw) || t.name.toLowerCase().includes(kw),
      );
    if (this.filterRating()) list = list.filter((t) => t.rating >= this.filterRating()!);
    if (this.filterUniversity())
      list = list.filter((t) => t.university === this.filterUniversity());
    return list;
  });

  editTutor(id: number) {
    this.router.navigate(['discovery/tutors/edit', id]).then();
  }
  deleteTutor(id: number) {
    this.store.deleteTutor(id);
  }
}
