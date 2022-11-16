import { UnmarshalledRoleHasPermission } from '../../domain/models/role-permission'
import { UnmarshalledUserHasRole } from '../../domain/models/user-role'

export interface IAccessControll {
  addRoleToUser(_userHasRole: UnmarshalledUserHasRole): Promise<string>
  addPermissionToRole(
    _roleHasPermission: UnmarshalledRoleHasPermission,
  ): Promise<string>

  removeRoleFromUser(_userHasRole: UnmarshalledUserHasRole): Promise<string>
  removePermissionFromRole(
    _roleHasPermission: UnmarshalledRoleHasPermission,
  ): Promise<string>
}
