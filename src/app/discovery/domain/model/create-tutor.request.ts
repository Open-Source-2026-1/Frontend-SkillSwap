/** Request para completar el perfil de Tutor justo después del sign-up con ROLE_TUTOR. */
export interface CreateTutorRequest {
  userId: number;
  name: string;
  university: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
  specialty: string;
  portfolioUrl: string;
  yearsExperience: number;
}
