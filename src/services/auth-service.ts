import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IAuthManager } from '../persistence/manager/auth-interface'
import { AuthForLoginDto, UserDto } from '../dtos/user-dto'
import { UserMapper } from '../dtos/mappers/user-mapper'

@injectable()
export class AuthService {
  constructor(@inject(TYPES.AuthManager) private _authManager: IAuthManager) {}

  public async authentication(authDto: AuthForLoginDto): Promise<string> {
    return await this._authManager.authentication(authDto)
  }

  public async me(id: string): Promise<UserDto> {
    const user = await this._authManager.me(id)
    // console.info(user.toJson())
    const userDto = UserMapper.domainToDto(user)
    return userDto
  }
}
