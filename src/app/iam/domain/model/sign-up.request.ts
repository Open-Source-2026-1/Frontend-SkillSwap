import { UserRole } from './user-role';

/** Request para POST /authentication/sign-up. email debe ser institucional (.edu.pe). firstName/lastName son opcionales. */
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: UserRole[];
}