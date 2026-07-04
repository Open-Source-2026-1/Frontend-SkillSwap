import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModerationStore } from '../../../application/moderation-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CURRENT_LEARNER_ID } from '../../../../shared/infrastructure/current-user';

/**
 * US24 — enviar un reporte.
 *
 * El backend solo tiene un campo `reason: String` (no separa "categoría" de
 * "descripción" como hacía el mock), así que combinamos ambos en un solo
 * string al armar el request: "Categoría: descripción detallada".
 */
@Component({
    selector: 'app-report-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './report-form.html',
    styleUrl: './report-form.css',
})
export class ReportForm {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private store = inject(ModerationStore);

    /** Datos que vienen como query params desde session-detail */
    private readonly sessionId: number =
        +(this.route.snapshot.queryParamMap.get('sessionId') ?? 0);
    readonly reportedUserId: number =
        +(this.route.snapshot.queryParamMap.get('reportedUserId') ?? 0);
    readonly reportedUserName: string =
        this.route.snapshot.queryParamMap.get('reportedUserName') ?? 'Usuario desconocido';

    readonly reasonOptions = [
        'Conducta inapropiada',
        'Lenguaje ofensivo',
        'Acoso o intimidación',
        'Contenido irrelevante',
        'No se presentó a la sesión',
        'Otro',
    ];

    form = this.fb.group({
        reason: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(10)],
        }),
    });

    submit(): void {
        if (this.form.invalid) return;

        this.store.addReport({
            reporterUserId: CURRENT_LEARNER_ID(),
            reportedUserId: this.reportedUserId,
            sessionId: this.sessionId,
            reason: `${this.form.value.reason}: ${this.form.value.description}`,
        });
        this.goBack();
    }

    goBack(): void {
        if (this.sessionId) {
            this.router.navigate(['workspace/tutoring-sessions', this.sessionId]).then();
        } else {
            this.router.navigate(['workspace/tutoring-sessions']).then();
        }
    }
}
