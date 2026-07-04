
export interface UpdateTutorRequest {
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