import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
// import { AuthDtoMapper } from '@/dtos/mappers/auth-mapper'
import { UserMapper } from '../../dtos/mappers/user-mapper'
import { AuthService } from '../../services/auth-service'
import { TYPES } from '../../types'
// import { Authorization } from '../../libs/authorization'
@injectable()
export default class AuthController {
  constructor(@inject(TYPES.AuthService) private _authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<void> {
    const authDto = UserMapper.requestToDto(req.body)
    const token = await this._authService.authentication(authDto)
    res.status(200).send({
      success: true,
      token: `jwt ${token}`,
    })
  }

  public async me(req: Request, res: Response): Promise<void> {
    res.send(await res.locals.Authorization)
  }
}
