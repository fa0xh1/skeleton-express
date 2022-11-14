import { AuthForLoginDto, UserCreateDto, UserDto } from '../user-dto'
import { UnmarshalledUser, User } from '../../domain/models/user'
// import { UserSession } from '../../libs/authorization'

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
      roles: raw.roles,
    }
  }

  public static toDomain(raw: UnmarshalledUser): User {
    // console.log(raw.roles)
    return User.create({
      id: raw.id,
      username: raw.username,
      email: raw.email,
      password: raw.password,
      roles: raw.roles,
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

interface userRequest {
  username: string
  password: string
  email: string
  role_id: number
}
