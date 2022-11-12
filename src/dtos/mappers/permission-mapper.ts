import { PermissionCreateDto, PermissionDto } from '../permission-dto'
import {
  UnmarshalledPermission,
  Permission,
} from '../../../src/domain/models/permission'

export class PermissionMapper {
  public static requestToDto(raw: permissionRequest): PermissionCreateDto {
    return {
      name: raw.name,
      description: raw.description,
    }
  }
  public static dtoToDomain(raw: PermissionCreateDto): UnmarshalledPermission {
    return {
      name: raw.name,
      description: raw.description,
    }
  }
  public static domainToDto(raw: Permission): PermissionDto {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
    }
  }
  public static toDomain(raw: UnmarshalledPermission): Permission {
    return Permission.create({
      id: raw.id,
      name: raw.name,
      description: raw.name,
    })
  }

  public static toEntity(raw: PermissionCreateDto): Permission {
    return Permission.create({
      name: raw.name,
      description: raw.name,
    })
  }
}

interface permissionRequest {
  name: string
  description: string
}
