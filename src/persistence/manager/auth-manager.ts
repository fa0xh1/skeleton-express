import { IAuthManager } from './auth-interface'
import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { AuthForLoginDto } from '../../dtos/user-dto'
import { User, UserInstance } from '../../infrastructure/database/models/user'
import { Role } from '../../infrastructure/database/models/role'

import { JWT_SECRET } from '../../libs/utils'
import {
  UnmarshalledUser,
  User as EntityUser,
} from '../../../src/domain/models/user'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
import { Permission } from '../../../src/infrastructure/database/models'

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

  async me(id: string): Promise<EntityUser> {
    const user = await User.findByPk<UserInstance>(id, {
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Permission,
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    })
    if (!user) {
      throw {
        statusCode: 404,
        message: 'User was not found',
      }
    }
    return UserMapper.toDomain(user)
  }
}
