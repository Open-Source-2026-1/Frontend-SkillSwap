import { BaseResource } from '../../shared/infrastructure/base-response';

export interface TutorResource extends BaseResource {
    id: number;
    userId: number | null;
    name: string;
    university: string;
    bio: string;
    rating: number;
    skills: string[];
    available: boolean;
    avatarUrl: string;
    specialty: string;
    portfolioUrl: string;
    yearsExperience: number;
    createdAt: string;
    updatedAt: string;
}


export interface CreateTutorResource {
    userId: number;
    name: string;
    university: string;
    bio: string;
    rating: number;
    skills: string[];
    available: boolean;
    avatarUrl: string;
    specialty: string;
    portfolioUrl: string;
    yearsExperience: number;
}


export interface UpdateTutorResource {
    name: string;
    university: string;
    bio: string;
    skills: string[];
    available: boolean;
    avatarUrl: string;
    specialty: string;
    portfolioUrl: string;
    yearsExperience: number;
}
