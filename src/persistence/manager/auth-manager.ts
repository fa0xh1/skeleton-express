import { IAuthManager } from './auth-interface'
import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { AuthForLoginDto } from '../../dtos/user-dto'
import { User } from '../../infrastructure/database/models/user'
import { JWT_SECRET } from '../../libs/utils'

@injectable()
export class AuthManager implements IAuthManager {
  async authentication(authDto: AuthForLoginDto): Promise<string> {
    const user = await User.findOne({
      where: {
        username: authDto.username,
      },
    })
    if (user != null) {
      if (JWT_SECRET) {
        const secretOrKey: string = JWT_SECRET
        const compare = await user.comparePassword(authDto.password)
        if (compare) {
          return jwt.sign(
            {
              id: user.id,
              username: user.username,
            },
            secretOrKey,
            { expiresIn: '1h' },
          )
        } else {
          throw {
            statusCode: 500,
            message: 'Invalid password',
          }
        }
      } else {
        throw {
          statusCode: 500,
          message: 'Secret key is not defined',
        }
      }
    } else {
      throw {
        statusCode: 500,
        message: 'Invalid username not found',
      }
    }
  }
}
