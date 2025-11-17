import { Lookup, SharedProperties } from '../shared/shared';

export interface UserGroupUserRoleDto extends Partial<SharedProperties> {
  id: string;
  userGroupId: string;
  userGroup: string;
  userRoleId: string;
  userRole: string;
}

export interface AddUserGroupUserRoleDto extends Partial<SharedProperties> {
  id: string;
  userGroupId: string;
  userRoleId: string;
}

export interface UpdateUserGroupUserRoleDto extends Partial<SharedProperties> {
  id: string;
  userGroupId: string;
  userRoleId: string;
}
