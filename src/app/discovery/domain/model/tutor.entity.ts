import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Tutor implements BaseEntity {
    private _id: number;
    private _userId: number | null;
    private _name: string;
    private _university: string;
    private _bio: string;
    private _rating: number;
    private _skills: string[];
    private _available: boolean;
    private _avatarUrl: string;
    private _specialty: string;
    private _portfolioUrl: string;
    private _yearsExperience: number;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(tutor: {
        id: number;
        userId?: number | null;
        name: string;
        university: string;
        bio: string;
        rating: number;
        skills: string[];
        available: boolean;
        avatarUrl: string;
        specialty?: string;
        portfolioUrl?: string;
        yearsExperience?: number;
        createdAt?: string;
        updatedAt?: string;
    }) {
        this._id = tutor.id;
        this._userId = tutor.userId ?? null;
        this._name = tutor.name;
        this._university = tutor.university;
        this._bio = tutor.bio;
        this._rating = tutor.rating;
        this._skills = tutor.skills;
        this._available = tutor.available;
        this._avatarUrl = tutor.avatarUrl;
        this._specialty = tutor.specialty ?? '';
        this._portfolioUrl = tutor.portfolioUrl ?? '';
        this._yearsExperience = tutor.yearsExperience ?? 0;
        this._createdAt = tutor.createdAt ?? '';
        this._updatedAt = tutor.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    /** Enlace hacia el User (IAM) que es dueño de este perfil de tutor. Nullable: los tutores de prueba creados antes del IAM no lo tienen. */
    get userId(): number | null { return this._userId; }
    set userId(value: number | null) { this._userId = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get university(): string { return this._university; }
    set university(value: string) { this._university = value; }

    get bio(): string { return this._bio; }
    set bio(value: string) { this._bio = value; }

    get rating(): number { return this._rating; }
    set rating(value: number) { this._rating = value; }

    get skills(): string[] { return this._skills; }
    set skills(value: string[]) { this._skills = value; }

    get available(): boolean { return this._available; }
    set available(value: boolean) { this._available = value; }

    get avatarUrl(): string { return this._avatarUrl; }
    set avatarUrl(value: string) { this._avatarUrl = value; }

    get specialty(): string { return this._specialty; }
    set specialty(value: string) { this._specialty = value; }

    get portfolioUrl(): string { return this._portfolioUrl; }
    set portfolioUrl(value: string) { this._portfolioUrl = value; }

    get yearsExperience(): number { return this._yearsExperience; }
    set yearsExperience(value: number) { this._yearsExperience = value; }

    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }
}
