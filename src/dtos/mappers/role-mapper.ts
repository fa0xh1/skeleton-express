import { RoleCreateDto, RoleDto } from '../role-dto'
import { UnmarshalledRole, Role } from '../../../src/domain/models/role'
export class RoleMapper {
  public static requestToDto(raw: roleRequest): RoleCreateDto {
    return {
      name: raw.name,
      description: raw.description,
    }
  }
  public static dtoToDomain(raw: RoleCreateDto): UnmarshalledRole {
    return {
      name: raw.name,
      description: raw.description,
    }
  }
  public static domainToDto(raw: Role): RoleDto {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
    }
  }

  public static toDomain(raw: UnmarshalledRole): Role {
    return Role.create({
      id: raw.id,
      name: raw.name,
      description: raw.name,
    })
  }

  public static toEntity(raw: RoleCreateDto): Role {
    return Role.create({
      name: raw.name,
      description: raw.name,
    })
  }
}

interface roleRequest {
  name: string
  description: string
}
