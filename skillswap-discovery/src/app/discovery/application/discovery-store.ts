import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Tutor } from '../domain/model/tutor.entity';
import { DiscoveryApi } from '../infrastructure/discovery-api';

@Injectable({ providedIn: 'root' })
export class DiscoveryStore {
  private readonly tutorsSignal = signal<Tutor[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly tutors = this.tutorsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly tutorCount = computed(() => this.tutors().length);

  constructor(private discoveryApi: DiscoveryApi) {
    this.loadTutors();
  }

  addTutor(tutor: Tutor): void {
    this.loadingSignal.set(true);
    this.discoveryApi
      .createTutor(tutor)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.tutorsSignal.update((tutors) => [...tutors, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  updateTutor(tutor: Tutor): void {
    this.loadingSignal.set(true);
    this.discoveryApi
      .updateTutor(tutor)
      .pipe(retry(2))
      .subscribe({
        next: (updated) => {
          this.tutorsSignal.update((tutors) =>
            tutors.map((t) => (t.id === updated.id ? updated : t)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  deleteTutor(id: number): void {
    this.loadingSignal.set(true);
    this.discoveryApi
      .deleteTutor(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.tutorsSignal.update((tutors) => tutors.filter((t) => t.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }

  private loadTutors(): void {
    this.loadingSignal.set(true);
    this.discoveryApi
      .getTutors()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (tutors) => {
          this.tutorsSignal.set(tutors);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        },
      });
  }
}
