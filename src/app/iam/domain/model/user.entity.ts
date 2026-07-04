import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { UserRole } from './user-role';

export class User implements BaseEntity {
    private _id: number;
    private _username: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _verified: boolean;
    private _roles: UserRole[];

    constructor(user: {
        id: number;
        username: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        verified?: boolean;
        roles: UserRole[];
    }) {
        this._id = user.id;
        this._username = user.username;
        this._email = user.email ?? '';
        this._firstName = user.firstName ?? '';
        this._lastName = user.lastName ?? '';
        this._verified = user.verified ?? false;
        this._roles = user.roles;
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get username(): string { return this._username; }
    set username(value: string) { this._username = value; }

    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }

    get firstName(): string { return this._firstName; }
    set firstName(value: string) { this._firstName = value; }

    get lastName(): string { return this._lastName; }
    set lastName(value: string) { this._lastName = value; }

    /** US04 — se marca en true al "confirmar" el correo institucional. */
    get verified(): boolean { return this._verified; }
    set verified(value: boolean) { this._verified = value; }

    get roles(): UserRole[] { return this._roles; }
    set roles(value: UserRole[]) { this._roles = value; }

    /** Nombre completo si lo llenó al registrarse; si no, cae al username. */
    get fullName(): string {
        const combined = `${this._firstName} ${this._lastName}`.trim();
        return combined || this._username;
    }

    hasRole(role: UserRole): boolean {
        return this._roles.includes(role);
    }
}