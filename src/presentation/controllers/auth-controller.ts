import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
// import { AuthDtoMapper } from '../../../src/dtos/mappers/auth-mapper'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
import { AuthService } from '../../../src/services/auth-service'
import { TYPES } from '../../types'
// import { Authorization } from '../../libs/authorization'
@injectable()
export default class AuthController {
  @inject(TYPES.AuthService) private _authService: AuthService
  constructor(authService: AuthService) {
    this._authService = authService
  }
  public async login(req: Request, res: Response): Promise<void> {
    const authDto = UserMapper.requestToDto(req.body)
    const token = await this._authService.authentication(authDto)
    res.status(200).send({
      success: true,
      token: `jwt ${token}`,
    })
  }

  public async me(req: Request, res: Response): Promise<void> {
    // await res.locals.checkRole('kontol')
    res.send(await res.locals.Authorization)
  }
}
