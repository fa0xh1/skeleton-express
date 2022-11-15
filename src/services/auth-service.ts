import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IAuthManager } from '../../src/persistence/manager/auth-interface'
import { AuthForLoginDto, UserDto } from '../../src/dtos/user-dto'
import { UserMapper } from '../../src/dtos/mappers/user-mapper'

@injectable()
export class AuthService {
  @inject(TYPES.AuthManager) private _authManager: IAuthManager
  constructor(authManager: IAuthManager) {
    this._authManager = authManager
  }
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
