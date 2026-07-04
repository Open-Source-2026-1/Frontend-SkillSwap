import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IamStore } from '../../../application/iam-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-become-learner',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './become-learner.html',
    styleUrl: './become-learner.css',
})
export class BecomeLearner {
    private router = inject(Router);
    readonly store = inject(IamStore);

    confirm(): void {
        this.store.addRole('ROLE_LEARNER');
    }

    cancel(): void {
        this.router.navigate(['/home']).then();
    }
}