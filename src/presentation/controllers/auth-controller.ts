import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
import { AuthService } from '../../../src/services/auth-service'
import { TYPES } from '../../types'
@injectable()
export default class AuthController {
  @inject(TYPES.AuthService) private _authService!: AuthService

  public async login(req: Request, res: Response): Promise<void> {
    const authDto = UserMapper.requestToDto(req.body)
    const token = await this._authService.authentication(authDto)
    res.status(200).send({
      success: true,
      token: `jwt ${token}`,
    })
  }
}
