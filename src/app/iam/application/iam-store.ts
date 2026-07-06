import { Injectable, computed, signal } from '@angular/core';
import { catchError, of, switchMap, tap } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { UserRole } from '../domain/model/user-role';
import { SignUpRequest } from '../domain/model/sign-up.request';
import { SignInRequest } from '../domain/model/sign-in.request';
import { IamApi } from '../infrastructure/iam-api';
import { DiscoveryApi } from '../../discovery/infrastructure/discovery-api';
import { __setCurrentIdentity } from '../../shared/infrastructure/current-user';

const SESSION_STORAGE_KEY = 'skillswap.session';

interface StoredSession {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    roles: UserRole[];
    token: string;
    tutorId: number | null;
}

/**
 * Store central de sesión. Resuelve 2 puentes:
 * 1) User (IAM) <-> Tutor (Discovery): secuencias de ID DISTINTAS, enlazadas
 *    vía Tutor.userId. currentTutorId() es null hasta que se confirma (o
 *    crea) el perfil de tutor de la sesión actual.
 * 2) Requisitos pendientes tras el login (verificar correo, completar perfil
 *    de tutor) — centralizados en `nextRequiredRoute`, así el guard y las 3
 *    vistas que redirigen tras autenticarse (sign-in, sign-up, become-tutor)
 *    no repiten la misma lógica cada una por su lado.
 */
@Injectable({
    providedIn: 'root',
})
export class IamStore {
    private readonly currentUserSignal = signal<User | null>(null);
    private readonly tokenSignal = signal<string | null>(null);
    private readonly currentTutorIdSignal = signal<number | null>(null);
    private readonly loadingSignal = signal<boolean>(false);
    private readonly errorSignal = signal<string | null>(null);

    readonly currentUser = this.currentUserSignal.asReadonly();
    readonly token = this.tokenSignal.asReadonly();
    readonly currentTutorId = this.currentTutorIdSignal.asReadonly();
    readonly loading = this.loadingSignal.asReadonly();
    readonly error = this.errorSignal.asReadonly();

    readonly isSignedIn = computed(() => this.currentUserSignal() !== null);
    readonly isTutor = computed(() => this.currentUserSignal()?.hasRole('ROLE_TUTOR') ?? false);
    readonly isLearner = computed(() => this.currentUserSignal()?.hasRole('ROLE_LEARNER') ?? false);
    readonly isModerator = computed(() => this.currentUserSignal()?.hasRole('ROLE_MODERATOR') ?? false);
    readonly hasTutorProfile = computed(() => this.currentTutorIdSignal() !== null);

    /** US01/US04 — falso hasta que se "confirma" el correo institucional (simulado). */
    readonly isVerified = computed(() => this.currentUserSignal()?.verified ?? false);

    /**
     * A dónde debe ir el usuario justo después de autenticarse, según qué le
     * falte completar. `null` = no hay pendientes, puede ir a donde quería ir.
     * Orden de prioridad: verificar correo > completar perfil de tutor.
     */
    readonly nextRequiredRoute = computed<string | null>(() => {
        if (!this.isSignedIn()) return null;
        if (!this.isVerified()) return '/iam/verify-email';
        if (this.isTutor() && !this.hasTutorProfile()) return '/iam/complete-tutor-profile';
        return null;
    });

    constructor(
        private iamApi: IamApi,
        private discoveryApi: DiscoveryApi,
    ) {
        this.restoreSession();
    }

    /** US_IAM — registro. Encadena sign-up -> sign-in automático (mejor UX, no hace falta loguearse dos veces). */
    signUp(request: SignUpRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.iamApi
            .signUp(request)
            .pipe(
                switchMap(() =>
                    this.iamApi.signIn({ username: request.username, password: request.password }),
                ),
                switchMap((session) => this.resolveTutorProfileAndSetSession(session.user, session.token)),
            )
            .subscribe({
                next: () => this.loadingSignal.set(false),
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo completar el registro'));
                    this.loadingSignal.set(false);
                },
            });
    }

    signIn(request: SignInRequest): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.iamApi
            .signIn(request)
            .pipe(switchMap((session) => this.resolveTutorProfileAndSetSession(session.user, session.token)))
            .subscribe({
                next: () => this.loadingSignal.set(false),
                error: (err) => {
                    this.errorSignal.set(this.formatError(err, 'No se pudo iniciar sesión'));
                    this.loadingSignal.set(false);
                },
            });
    }

    signOut(): void {
        this.currentUserSignal.set(null);
        this.tokenSignal.set(null);
        this.currentTutorIdSignal.set(null);
        localStorage.removeItem(SESSION_STORAGE_KEY);
        __setCurrentIdentity({ userId: null, tutorId: null, username: '', fullName: '', roles: [] });
    }

    /** US04 — simula el clic en el enlace de confirmación del correo institucional. */
    verifyEmail(): void {
        const user = this.currentUserSignal();
        if (!user) return;

        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.iamApi.verifyUser(user.id).subscribe({
            next: (updated) => {
                this.currentUserSignal.set(updated);
                this.persistSession(updated, this.tokenSignal()!, this.currentTutorIdSignal());
                this.syncBridge(updated, this.currentTutorIdSignal());
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudo verificar tu cuenta'));
                this.loadingSignal.set(false);
            },
        });
    }

    /** US_IAM — caso Valeria: aprendiz que también quiere ser tutora (o viceversa), sin crear cuenta nueva. */
    addRole(role: UserRole): void {
        const user = this.currentUserSignal();
        if (!user || user.hasRole(role)) return;

        const newRoles = [...user.roles, role];
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.iamApi.updateUserRoles(user.id, { roles: newRoles }).subscribe({
            next: (updated) => {
                this.currentUserSignal.set(updated);
                this.persistSession(updated, this.tokenSignal()!, this.currentTutorIdSignal());
                this.syncBridge(updated, this.currentTutorIdSignal());
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(this.formatError(err, 'No se pudo actualizar tu rol'));
                this.loadingSignal.set(false);
            },
        });
    }

    /** Llamado justo después de crear el perfil de Tutor en Discovery (evita un refetch). */
    linkTutorProfile(tutorId: number): void {
        this.currentTutorIdSignal.set(tutorId);
        const user = this.currentUserSignal();
        const token = this.tokenSignal();
        if (user && token) {
            this.persistSession(user, token, tutorId);
            this.syncBridge(user, tutorId);
        }
    }


    private readonly userNamesCacheSignal = signal<Map<number, string>>(new Map());
    private readonly pendingUserFetches = new Set<number>();


    resolveUserName(userId: number): string {
        const cached = this.userNamesCacheSignal().get(userId);
        if (cached) return cached;

        if (userId === this.currentUserSignal()?.id) {
            return this.currentUserSignal()!.fullName;
        }

        if (!this.pendingUserFetches.has(userId)) {
            this.pendingUserFetches.add(userId);
            this.iamApi.getUserById(userId).subscribe({
                next: (user) => {
                    this.userNamesCacheSignal.update((cache) => {
                        const next = new Map(cache);
                        next.set(userId, user.fullName);
                        return next;
                    });
                    this.pendingUserFetches.delete(userId);
                },
                error: () => this.pendingUserFetches.delete(userId),
            });
        }

        return `Usuario #${userId}`;
    }

    private resolveTutorProfileAndSetSession(user: User, token: string) {
        // Si todavía no verificó su correo, ni tiene sentido preguntar por el perfil de tutor.
        if (!user.verified || !user.hasRole('ROLE_TUTOR')) {
            this.setSession(user, token, null);
            return of(null);
        }
        return this.discoveryApi.getTutorByUserId(user.id).pipe(
            tap((tutor) => this.setSession(user, token, tutor ? tutor.id : null)),
            catchError(() => {
                this.setSession(user, token, null);
                return of(null);
            }),
        );
    }

    private setSession(user: User, token: string, tutorId: number | null): void {
        this.currentUserSignal.set(user);
        this.tokenSignal.set(token);
        this.currentTutorIdSignal.set(tutorId);
        this.persistSession(user, token, tutorId);
        this.syncBridge(user, tutorId);
    }

    private persistSession(user: User, token: string, tutorId: number | null): void {
        const stored: StoredSession = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            verified: user.verified,
            roles: user.roles,
            token,
            tutorId,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(stored));
    }

    private restoreSession(): void {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!raw) return;
        try {
            const stored: StoredSession = JSON.parse(raw);
            const user = new User({
                id: stored.id,
                username: stored.username,
                email: stored.email,
                firstName: stored.firstName,
                lastName: stored.lastName,
                verified: stored.verified,
                roles: stored.roles,
            });
            this.currentUserSignal.set(user);
            this.tokenSignal.set(stored.token);
            this.currentTutorIdSignal.set(stored.tutorId);
            this.syncBridge(user, stored.tutorId);
        } catch {
            localStorage.removeItem(SESSION_STORAGE_KEY);
        }
    }

    private syncBridge(user: User, tutorId: number | null): void {
        __setCurrentIdentity({
            userId: user.id,
            tutorId,
            username: user.username,
            fullName: user.fullName,
            roles: user.roles,
        });
    }

    private formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}