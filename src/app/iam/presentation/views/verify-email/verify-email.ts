import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-verify-email',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './verify-email.html',
    styleUrl: './verify-email.css',
})
export class VerifyEmail {
    private router = inject(Router);
    readonly store = inject(IamStore);

    constructor() {
        // Una vez verificado, sigue el flujo normal (completar perfil de tutor, o a casa).
        effect(() => {
            if (this.store.isVerified()) {
                const pending = this.store.nextRequiredRoute();
                this.router.navigateByUrl(pending ?? '/home').then();
            }
        });
    }

    simulateEmailClick(): void {
        this.store.verifyEmail();
    }
}