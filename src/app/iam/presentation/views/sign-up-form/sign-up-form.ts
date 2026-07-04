import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { UserRole } from '../../../domain/model/user-role';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-sign-up-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        RouterLink,
    ],
    templateUrl: './sign-up-form.html',
    styleUrl: './sign-up-form.css',
})
export class SignUpForm {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    readonly store = inject(IamStore);

    readonly wantsLearner = signal<boolean>(true);
    readonly wantsTutor = signal<boolean>(false);

    /** Al menos un rol es obligatorio. */
    readonly noRoleSelected = signal<boolean>(false);

    form = this.fb.group({
        username: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(3)],
        }),
        email: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.email,
                Validators.pattern(/^[^\s@]+@[^\s@]+\.edu\.pe$/),
            ],
        }),
        password: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(8)],
        }),
        firstName: new FormControl<string>('', { nonNullable: true }),
        lastName: new FormControl<string>('', { nonNullable: true }),
    });

    constructor() {

        effect(() => {
            if (!this.store.isSignedIn()) return;
            const pending = this.store.nextRequiredRoute();
            if (pending) {
                this.router.navigateByUrl(pending).then();
                return;
            }
            const fallback = this.store.isModerator() ? '/coordinator' : '/home';
            this.router.navigateByUrl(fallback).then();
        });
    }

    toggleLearner(checked: boolean): void {
        this.wantsLearner.set(checked);
        this.noRoleSelected.set(false);
    }

    toggleTutor(checked: boolean): void {
        this.wantsTutor.set(checked);
        this.noRoleSelected.set(false);
    }

    submit(): void {
        if (this.form.invalid) return;

        const roles: UserRole[] = [];
        if (this.wantsLearner()) roles.push('ROLE_LEARNER');
        if (this.wantsTutor()) roles.push('ROLE_TUTOR');

        if (roles.length === 0) {
            this.noRoleSelected.set(true);
            return;
        }

        this.store.signUp({
            username: this.form.value.username!,
            email: this.form.value.email!,
            password: this.form.value.password!,
            firstName: this.form.value.firstName || undefined,
            lastName: this.form.value.lastName || undefined,
            roles,
        });
    }
}
