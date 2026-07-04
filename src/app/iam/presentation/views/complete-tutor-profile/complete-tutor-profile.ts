import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { DiscoveryStore } from '../../../../discovery/application/discovery-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * US_IAM — se muestra justo después del sign-up/sign-in cuando el usuario
 * tiene ROLE_TUTOR pero todavía no tiene perfil de Tutor armado en Discovery
 * (Tutor.userId no coincide con ningún tutor existente).
 */
@Component({
    selector: 'app-complete-tutor-profile',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
    ],
    templateUrl: './complete-tutor-profile.html',
    styleUrl: './complete-tutor-profile.css',
})
export class CompleteTutorProfile {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private iamStore = inject(IamStore);
    private discoveryStore = inject(DiscoveryStore);

    readonly saving = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    readonly skills = signal<string[]>([]);
    readonly skillInput = new FormControl<string>('', { nonNullable: true });

    form = this.fb.group({
        university: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        specialty: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        bio: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(20)],
        }),
        avatarUrl: new FormControl<string>('https://i.pravatar.cc/150', { nonNullable: true }),
        portfolioUrl: new FormControl<string>('', { nonNullable: true }),
        yearsExperience: new FormControl<number>(0, { nonNullable: true }),
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
        if (this.form.invalid || this.skills().length === 0) return;
        const user = this.iamStore.currentUser();
        if (!user) return;

        this.saving.set(true);
        this.error.set(null);

        this.discoveryStore
            .createTutor({
                userId: user.id,
                name: user.fullName,
                university: this.form.value.university!,
                bio: this.form.value.bio!,
                skills: this.skills(),
                avatarUrl: this.form.value.avatarUrl!,
                specialty: this.form.value.specialty!,
                portfolioUrl: this.form.value.portfolioUrl ?? '',
                yearsExperience: this.form.value.yearsExperience ?? 0,
            })
            .subscribe({
                next: (tutor) => {
                    this.iamStore.linkTutorProfile(tutor.id);
                    this.saving.set(false);
                    this.router.navigate(['/home']).then();
                },
                error: (err) => {
                    this.error.set(err instanceof Error ? err.message : 'No se pudo crear tu perfil');
                    this.saving.set(false);
                },
            });
    }
}
