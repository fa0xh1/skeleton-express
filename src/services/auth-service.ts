import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IAuthManager } from '../../src/persistence/manager/auth-interface'
import { AuthForLoginDto } from '../../src/dtos/user-dto'

@injectable()
export class AuthService {
  @inject(TYPES.AuthManager) private _authManager!: IAuthManager

  public authentication(authDto: AuthForLoginDto): Promise<string> {
    return this._authManager.authentication(authDto)
  }
}
