import { UserRoleCreateDto, UserRoleDto } from '../role-dto'
import { RolePermissionCreateDto, RolePermissionDto } from '../permission-dto'
import {
  UnmarshalledUserHasRole,
  UserHasRole,
} from '../../domain/models/user-role'
import {
  RoleHasPermission,
  UnmarshalledRoleHasPermission,
} from '../../domain/models/role-permission'

export class UserHasRoleMapper {
  public static requestToDto(raw: userRoleRequest): UserRoleCreateDto {
    return {
      user_id: raw.user_id,
      role_id: raw.role_id,
    }
  }
  public static dtoToDomain(raw: UserRoleCreateDto): UnmarshalledUserHasRole {
    return {
      user_id: raw.user_id,
      role_id: raw.role_id,
    }
  }
  public static domainToDto(raw: UserHasRole): UserRoleDto {
    return {
      user_id: raw.user,
      role_id: raw.role,
    }
  }

  public static toDomain(raw: UnmarshalledUserHasRole): UserHasRole {
    return UserHasRole.create({
      user_id: raw.user_id,
      role_id: raw.role_id,
    })
  }

  public static toEntity(raw: UserRoleCreateDto): UserHasRole {
    return UserHasRole.create({
      user_id: raw.user_id,
      role_id: raw.role_id,
    })
  }
}

export class RoleHasPermissionMapper {
  public static requestToDto(
    raw: rolePermissionRequest,
  ): RolePermissionCreateDto {
    return {
      role_id: raw.role_id,
      permission_id: raw.permission_id,
    }
  }
  public static dtoToDomain(
    raw: RolePermissionCreateDto,
  ): UnmarshalledRoleHasPermission {
    return {
      role_id: raw.role_id,
      permission_id: raw.permission_id,
    }
  }
  public static domainToDto(raw: RoleHasPermission): RolePermissionDto {
    return {
      role_id: raw.role,
      permission_id: raw.permission,
    }
  }

  public static toDomain(
    raw: UnmarshalledRoleHasPermission,
  ): RoleHasPermission {
    return RoleHasPermission.create({
      role_id: raw.role_id,
      permission_id: raw.permission_id,
    })
  }

  public static toEntity(raw: RolePermissionCreateDto): RoleHasPermission {
    return RoleHasPermission.create({
      role_id: raw.role_id,
      permission_id: raw.permission_id,
    })
  }
}

interface userRoleRequest {
  user_id: string
  role_id: string[]
}

interface rolePermissionRequest {
  role_id: string
  permission_id: string[]
}
