import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * US_IAM — caso Valeria: ya es aprendiz (ROLE_LEARNER) y decide también
 * ofrecer tutorías. Agrega ROLE_TUTOR a su MISMA cuenta (sin registrarse de
 * nuevo) y de ahí la manda a completar su perfil de tutor.
 */
@Component({
    selector: 'app-become-tutor',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './become-tutor.html',
    styleUrl: './become-tutor.css',
})
export class BecomeTutor {
    private router = inject(Router);
    readonly store = inject(IamStore);

    constructor() {
        effect(() => {
            const pending = this.store.nextRequiredRoute();
            if (pending === '/iam/complete-tutor-profile') {
                this.router.navigateByUrl(pending).then();
            }
        });
    }

    confirm(): void {
        this.store.addRole('ROLE_TUTOR');
    }

    cancel(): void {
        this.router.navigate(['/home']).then();
    }
}
