import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enum/user-role.enum';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

export const skipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (...roles: UserRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
