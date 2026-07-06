import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sign-in-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
    ],
    templateUrl: './sign-in-form.html',
    styleUrl: './sign-in-form.css',
})
export class SignInForm {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    readonly store = inject(IamStore);

    private readonly returnUrl: string | null =
        this.route.snapshot.queryParamMap.get('returnUrl');

    form = this.fb.group({
        username: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        password: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor() {

        effect(() => {
            if (!this.store.isSignedIn()) return;
            const pending = this.store.nextRequiredRoute();
            if (pending) {
                this.router.navigateByUrl(pending).then();
                return;
            }
            if (this.store.isModerator()) {
                this.router.navigateByUrl('/coordinator').then();
                return;
            }
            this.router.navigateByUrl(this.returnUrl ?? '/home').then();
        });
    }

    submit(): void {
        if (this.form.invalid) return;
        this.store.signIn({
            username: this.form.value.username!,
            password: this.form.value.password!,
        });
    }
}
