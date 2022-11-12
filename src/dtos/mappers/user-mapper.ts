import { AuthForLoginDto, UserCreateDto, UserDto } from '../user-dto'
import { UnmarshalledUser, User } from '../../domain/models/user'

export class UserMapper {
  public static requestToDto(raw: userRequest): UserCreateDto {
    return {
      username: raw.username,
      email: raw.email,
      password: raw.password,
    }
  }

  public static dtoToDomain(raw: UserCreateDto): UnmarshalledUser {
    return {
      username: raw.username,
      email: raw.email,
      password: raw.password,
    }
  }
  public static dtoToEntity(raw: UserCreateDto): User {
    return User.create({
      username: raw.username,
      email: raw.email,
      password: raw.password,
    })
  }
  public static domainToDto(raw: User): UserDto {
    return {
      id: raw.id,
      username: raw.username,
      email: raw.email,
    }
  }

  public static toDomain(raw: UnmarshalledUser): User {
    return User.create({
      id: raw.id,
      username: raw.username,
      email: raw.email,
      password: raw.password,
    })
  }

  public static toEntity(raw: UserCreateDto): User {
    return User.create({
      username: raw.username,
      email: raw.email,
      password: raw.password,
    })
  }
}

export class AuthDtoMapper {
  public static toDto(raw: authRequest): AuthForLoginDto {
    return {
      username: raw.username,
      password: raw.password,
    }
  }
}

interface authRequest {
  username: string
  email: string
  password: string
}

interface userRequest {
  username: string
  password: string
  email: string
  role_id: number
}
