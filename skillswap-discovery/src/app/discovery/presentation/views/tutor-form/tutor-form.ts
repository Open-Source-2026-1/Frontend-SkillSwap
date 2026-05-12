import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiscoveryStore } from '../../../application/discovery-store';
import { Tutor } from '../../../domain/model/tutor.entity';


@Component({
  selector: 'app-tutor-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tutor-form.html',
  styleUrl: './tutor-form.css',
})
export class TutorForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(DiscoveryStore);

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    university: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    course: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    rating: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(5)],
    }),
    biography: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isEdit = false;
  tutorId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.tutorId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.tutorId;
      if (this.isEdit) {
        const tutor = this.store.tutors().find((t) => t.id === this.tutorId);
        if (tutor) {
          this.form.patchValue({
            name: tutor.name,
            university: tutor.university,
            course: tutor.course,
            rating: tutor.rating,
            biography: tutor.biography,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const tutor: Tutor = new Tutor({
      id: this.tutorId ?? 0,
      name: this.form.value.name!,
      university: this.form.value.university!,
      course: this.form.value.course!,
      rating: this.form.value.rating!,
      biography: this.form.value.biography!,
    });
    if (this.isEdit) {
      this.store.updateTutor(tutor);
    } else {
      this.store.addTutor(tutor);
    }
    this.router.navigate(['discovery/tutors']).then();
  }
}
