import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LearningStore } from '../../../application/learning-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { QuizQuestion } from '../../../domain/model/quiz.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';

@Component({
    selector: 'app-quiz-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './quiz-form.html',
    styleUrl: './quiz-form.css',
})
export class QuizForm {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    readonly store = inject(LearningStore);
    private discoveryStore = inject(DiscoveryStore);

    constructor() {

        effect(() => {
            if (this.store.quizCreated()) {
                this.router.navigate(['learning/admin']).then();
            }
        });
    }

    readonly courseOptions = computed(() => {
        const specialties = this.discoveryStore
            .tutors()
            .map((t) => t.specialty)
            .filter((s) => !!s);
        return [...new Set(specialties)].sort();
    });

    readonly questions = signal<QuizQuestion[]>([]);

    form = this.fb.group({
        title: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        course: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    questionForm = this.fb.group({
        text: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        option0: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        option1: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        option2: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        option3: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        correctIndex: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    readonly correctOptions = [
        { value: 0, label: 'Opción A' },
        { value: 1, label: 'Opción B' },
        { value: 2, label: 'Opción C' },
        { value: 3, label: 'Opción D' },
    ];

    addQuestion(): void {
        if (this.questionForm.invalid) return;
        const v = this.questionForm.value;
        const newQ: QuizQuestion = {
            text: v.text!,
            options: [v.option0!, v.option1!, v.option2!, v.option3!],
            correctIndex: v.correctIndex!,
        };
        this.questions.update((qs) => [...qs, newQ]);
        this.questionForm.reset({ correctIndex: 0 });
    }

    removeQuestion(index: number): void {
        this.questions.update((qs) => qs.filter((_, i) => i !== index));
    }

    submit(): void {
        if (this.form.invalid || this.questions().length === 0) return;
        this.store.addQuiz({
            title: this.form.value.title!,
            course: this.form.value.course!,
            // El backend ya hizo tutorId opcional/nullable — el banco de quizzes lo
            // administra el moderador (createdBy = su User.id), no un tutor.
            createdBy: CURRENT_LEARNER_ID(),
            questions: this.questions(),
        });
    }

    goBack(): void {
        this.router.navigate(['learning/admin']).then();
    }
}