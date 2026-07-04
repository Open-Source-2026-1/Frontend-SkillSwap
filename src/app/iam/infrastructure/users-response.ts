import { BaseResource } from '../../shared/infrastructure/base-response';
import { UserRole } from '../domain/model/user-role';

export interface UserResource extends BaseResource {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  roles: UserRole[];
}

export interface AuthenticatedUserResource extends UserResource {
  token: string;
}

/** Body para POST /authentication/sign-up. */
export interface CreateUserResource {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: UserRole[];
}

/** Body para POST /authentication/sign-in. */
export interface SignInResource {
  username: string;
  password: string;
}

/** Body para PATCH /users/{id}/roles. */
export interface UpdateUserRolesResource {
  roles: UserRole[];
}