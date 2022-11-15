import { UserSession } from '../../libs/authorization'
import { AuthForLoginDto, UserDto } from '../user-dto'

export class AuthDtoMapper {
  public static toDto(raw: authRequest): AuthForLoginDto {
    return {
      username: raw.username,
      password: raw.password,
    }
  }

  public static dtoToSession(raw: UserDto): UserSession {
    return {
      id: raw.id,
      role: raw.roles,
      permission: raw.permissions,
    }
  }
}

interface authRequest {
  username: string
  email: string
  password: string
}
