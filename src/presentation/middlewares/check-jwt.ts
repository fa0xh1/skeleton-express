import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../libs/utils'
import { injectable, inject } from 'inversify'
import { AuthService } from '../../services/auth-service'
import { TYPES } from '../../types'
import { AuthDtoMapper } from '../../dtos/mappers/auth-mapper'
import { Authorization, UserSession } from '../../libs/authorization'
import { UserDto } from '../../dtos/user-dto'

interface authUser {
  id: string
  username: string
}

@injectable()
export class AuthMiddleware {
  constructor(@inject(TYPES.AuthService) private _authService: AuthService) {}
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
