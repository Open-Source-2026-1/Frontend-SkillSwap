import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscoveryStore } from '../../../application/discovery-store';
import { IamStore } from '../../../../iam/application/iam-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/**
 * US_IAM — editar mi propio perfil de tutor (creado una sola vez al
 * registrarse). El backend valida que Tutor.userId sea el mío (403 si no),
 * y ya no acepta `rating` en este endpoint — ese sigue siendo calculado
 * 100% desde las reseñas reales, nunca editable a mano.
 */
@Component({
    selector: 'app-edit-tutor-profile',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
    ],
    templateUrl: './edit-tutor-profile.html',
    styleUrl: './edit-tutor-profile.css',
})
export class EditTutorProfile {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private discoveryStore = inject(DiscoveryStore);
    private iamStore = inject(IamStore);

    readonly saving = signal<boolean>(false);
    readonly error = signal<string | null>(null);
    readonly saved = signal<boolean>(false);

    readonly tutorId = this.iamStore.currentTutorId();
    readonly currentTutor = computed(() =>
        this.tutorId ? this.discoveryStore.getTutorById(this.tutorId)() : undefined,
    );

    readonly skills = signal<string[]>(this.currentTutor()?.skills ?? []);
    readonly skillInput = new FormControl<string>('', { nonNullable: true });

    form = this.fb.group({
        university: new FormControl<string>(this.currentTutor()?.university ?? '', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        specialty: new FormControl<string>(this.currentTutor()?.specialty ?? '', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        bio: new FormControl<string>(this.currentTutor()?.bio ?? '', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(20)],
        }),
        avatarUrl: new FormControl<string>(this.currentTutor()?.avatarUrl ?? '', { nonNullable: true }),
        portfolioUrl: new FormControl<string>(this.currentTutor()?.portfolioUrl ?? '', {
            nonNullable: true,
        }),
        yearsExperience: new FormControl<number>(this.currentTutor()?.yearsExperience ?? 0, {
            nonNullable: true,
        }),
        available: new FormControl<boolean>(this.currentTutor()?.available ?? true, {
            nonNullable: true,
        }),
    });

    addSkill(): void {
        const value = this.skillInput.value.trim();
        if (!value || this.skills().includes(value)) return;
        this.skills.update((s) => [...s, value]);
        this.skillInput.reset();
    }

    removeSkill(skill: string): void {
        this.skills.update((s) => s.filter((sk) => sk !== skill));
    }

    submit(): void {
        if (this.form.invalid || this.skills().length === 0 || !this.tutorId) return;
        const tutor = this.currentTutor();
        if (!tutor) return;

        this.saving.set(true);
        this.error.set(null);
        this.saved.set(false);

        this.discoveryStore
            .updateTutor(this.tutorId, {
                name: tutor.name,
                university: this.form.value.university!,
                bio: this.form.value.bio!,
                skills: this.skills(),
                available: this.form.value.available!,
                avatarUrl: this.form.value.avatarUrl!,
                specialty: this.form.value.specialty!,
                portfolioUrl: this.form.value.portfolioUrl ?? '',
                yearsExperience: this.form.value.yearsExperience ?? 0,
            })
            .subscribe({
                next: () => {
                    this.saving.set(false);
                    this.saved.set(true);
                },
                error: (err) => {
                    this.error.set(err instanceof Error ? err.message : 'No se pudo actualizar tu perfil');
                    this.saving.set(false);
                },
            });
    }

    goBack(): void {
        this.router.navigate(['/reputation/my-profile']).then();
    }
}