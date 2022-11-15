import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../src/libs/utils'
import { injectable, inject } from 'inversify'
import { AuthService } from '../../../src/services/auth-service'
import { TYPES } from '../../../src/types'
import { AuthDtoMapper } from '../../../src/dtos/mappers/auth-mapper'
import { Authorization, UserSession } from '../../../src/libs/authorization'
import { UserDto } from '../../../src/dtos/user-dto'

interface authUser {
  id: string
  username: string
}

@injectable()
export class AuthMiddleware {
  @inject(TYPES.AuthService) private _authService: AuthService
  constructor(authService: AuthService) {
    this._authService = authService
  }
  public checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.get('Authorization')
    let jwtPayload: authUser
    try {
      jwtPayload = <authUser>jwt.verify(token.substring(4), JWT_SECRET)
      res.locals.jwtPayload = jwtPayload
      const me: UserDto = await this._authService.me(jwtPayload.id)
      const userSession: UserSession = AuthDtoMapper.dtoToSession(me)
      res.locals.Authorization = Authorization.create(userSession)
    } catch (error) {
      res.status(401).send('Unauthorized')
      return
    }

    const { id, username } = jwtPayload
    const newToken = jwt.sign({ id, username }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.setHeader('token', newToken)

    next()
  }
}
