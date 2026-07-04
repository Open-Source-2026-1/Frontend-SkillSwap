import { UserRole } from './user-role';

/**
 * Request para PATCH /users/{id}/roles.
 * Se manda la lista COMPLETA de roles que el usuario debe tener después del
 * cambio (no solo el que se agrega) — así el mismo request sirve para
 * agregar y para quitar roles.
 */
export interface UpdateUserRolesRequest {
  roles: UserRole[];
}
