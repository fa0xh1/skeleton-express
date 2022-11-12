import { injectable } from 'inversify'
import { IAccessControll } from '../../../src/domain/service/interface-access-controll'
import { UnmarshalledUserHasRole } from '../../../src/domain/models/user-role'
import { UnmarshalledRoleHasPermission } from '../../../src/domain/models/role-permission'
import { Role, User } from '../../../src/infrastructure/database/models'
import {
  RoleHasPermissionMapper,
  UserHasRoleMapper,
} from '../../../src/dtos/mappers/access-controll-mapper'

@injectable()
export class AccessControllManager implements IAccessControll {
  async addRoleToUser(_userHasRole: UnmarshalledUserHasRole): Promise<string> {
    try {
      const userHasRole = UserHasRoleMapper.toDomain(_userHasRole)
      const user = await User.findByPk(_userHasRole.user_id)
      if (!user) {
        throw {
          statusCode: 404,
          message: 'User was not found',
        }
      }
      await user.addRole(userHasRole.unmarshal().role_id, {
        through: { id: userHasRole.id },
      })
    } catch (e) {
      console.error(e)
      throw {
        statusCode: 500,
        message: e,
      }
    }

    return 'success'
  }

  async removeRoleFromUser(
    _userHasRole: UnmarshalledUserHasRole,
  ): Promise<string> {
    try {
      const userHasRole = UserHasRoleMapper.toDomain(_userHasRole)
      const user = await User.findByPk(_userHasRole.user_id)
      if (!user) {
        throw {
          statusCode: 404,
          message: 'User was not found',
        }
      }
      await user.removeRole(userHasRole.unmarshal().role_id)
    } catch (e) {
      console.error(e)
      throw {
        statusCode: 500,
        message: e,
      }
    }

    return 'success'
  }

  async addPermissionToRole(
    _roleHasPermission: UnmarshalledRoleHasPermission,
  ): Promise<string> {
    try {
      const roleHasPermission =
        RoleHasPermissionMapper.toDomain(_roleHasPermission)
      const role = await Role.findByPk(_roleHasPermission.role_id)

      if (!role) {
        throw {
          statusCode: 404,
          message: 'Role was not found',
        }
      }
      await role.addPermission(roleHasPermission.unmarshal().permission_id, {
        through: { id: roleHasPermission.id },
      })
    } catch (e) {
      console.error(e)
      throw {
        statusCode: 500,
        message: e,
      }
    }

    return 'success'
  }

  async removePermissionFromRole(
    _roleHasPermission: UnmarshalledRoleHasPermission,
  ): Promise<string> {
    try {
      const roleHasPermission =
        RoleHasPermissionMapper.toDomain(_roleHasPermission)
      const role = await Role.findByPk(_roleHasPermission.role_id)

      if (!role) {
        throw {
          statusCode: 404,
          message: 'Role was not found',
        }
      }
      await role.removePermission(roleHasPermission.unmarshal().permission_id)
    } catch (e) {
      console.error(e)
      throw {
        statusCode: 500,
        message: e,
      }
    }

    return 'success'
  }
}
