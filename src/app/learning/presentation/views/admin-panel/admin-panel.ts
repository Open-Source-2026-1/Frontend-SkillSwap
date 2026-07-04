import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LearningStore } from '../../../application/learning-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-admin-panel',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinner, DatePipe],
    templateUrl: './admin-panel.html',
    styleUrl: './admin-panel.css',
})
export class AdminPanel {
    readonly store = inject(LearningStore);
    readonly discoveryStore = inject(DiscoveryStore);
    protected router = inject(Router);

    creatorName(createdBy: number): string {
        return `Moderador #${createdBy}`;
    }

    readonly selectedCourse = signal<string>('all');


    readonly courseFilters = computed(() => [
        { value: 'all', label: 'Todos' },
        ...this.store.courses().map((c) => ({ value: c, label: c })),
    ]);

    get filteredQuizzes() {
        const course = this.selectedCourse();
        return course === 'all'
            ? this.store.quizzes()
            : this.store.quizzes().filter((q) => q.course === course);
    }

    setFilter(course: string): void {
        this.selectedCourse.set(course);
    }

    createQuiz(): void {
        this.router.navigate(['learning/quiz-form']).then();
    }

    deleteQuiz(event: Event, id: number): void {
        event.stopPropagation();
        const confirmed = window.confirm(
            'El backend no revisa si este quiz ya tiene intentos registrados: si los tiene, quedarán huérfanos. ¿Seguro que quieres eliminarlo?',
        );
        if (!confirmed) return;
        this.store.deleteQuiz(id);
    }

    goBack(): void {
        this.router.navigate(['/workspace/tutoring-sessions']).then();
    }
}