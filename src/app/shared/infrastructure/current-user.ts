

let _userId: number | null = null;
let _tutorId: number | null = null;
let _username = '';
let _fullName = '';
let _roles: string[] = [];

/** Llamado únicamente por IamStore. No usar desde otro lugar. */
export function __setCurrentIdentity(identity: {
    userId: number | null;
    tutorId: number | null;
    username: string;
    fullName: string;
    roles: string[];
}): void {
    _userId = identity.userId;
    _tutorId = identity.tutorId;
    _username = identity.username;
    _fullName = identity.fullName;
    _roles = identity.roles;
}

export function isSignedIn(): boolean {
    return _userId !== null;
}

export function CURRENT_LEARNER_ID(): number {
    if (_userId === null) {
        throw new Error('No hay sesión activa (CURRENT_LEARNER_ID llamado sin usuario logueado)');
    }
    return _userId;
}

export function CURRENT_TUTOR_ID(): number {
    if (_tutorId === null) {
        throw new Error('El usuario actual no tiene perfil de tutor (CURRENT_TUTOR_ID)');
    }
    return _tutorId;
}

export function hasTutorProfile(): boolean {
    return _tutorId !== null;
}

export function CURRENT_USERNAME(): string {
    return _username;
}

export function CURRENT_FULL_NAME(): string {
    return _fullName || _username;
}

export function CURRENT_ROLES(): string[] {
    return _roles;
}

export function hasRole(role: 'ROLE_LEARNER' | 'ROLE_TUTOR'): boolean {
    return _roles.includes(role);
}
