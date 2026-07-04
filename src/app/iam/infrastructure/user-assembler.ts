import { User } from '../domain/model/user.entity';
import { SignUpRequest } from '../domain/model/sign-up.request';
import { SignInRequest } from '../domain/model/sign-in.request';
import { UpdateUserRolesRequest } from '../domain/model/update-user-roles.request';
import {
  AuthenticatedUserResource,
  CreateUserResource,
  SignInResource,
  UpdateUserRolesResource,
  UserResource,
} from './users-response';

export class UserAssembler {
  toEntityFromResource(resource: UserResource): User {
    return new User({
      id: resource.id,
      username: resource.username,
      email: resource.email,
      firstName: resource.firstName,
      lastName: resource.lastName,
      verified: resource.verified,
      roles: resource.roles,
    });
  }

  toEntitiesFromResources(resources: UserResource[]): User[] {
    return resources.map((resource) => this.toEntityFromResource(resource));
  }

  /** El sign-in devuelve además el token — se separa del User para no mezclar concerns. */
  toEntityFromAuthenticatedResource(resource: AuthenticatedUserResource): User {
    return this.toEntityFromResource(resource);
  }

  toResourceFromSignUpRequest(request: SignUpRequest): CreateUserResource {
    return {
      username: request.username,
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
      roles: request.roles,
    };
  }

  toResourceFromSignInRequest(request: SignInRequest): SignInResource {
    return {
      username: request.username,
      password: request.password,
    };
  }

  toResourceFromUpdateRolesRequest(request: UpdateUserRolesRequest): UpdateUserRolesResource {
    return { roles: request.roles };
  }
}