import {
  UnmarshalledUser,
  User as EntityUser,
} from '../../../src/domain/models/user'
import { IUserRepository } from '../../domain/service/interface-user-repository'
import { injectable } from 'inversify'
import { ResourceNotFound } from '../../../src/libs/errors'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
import { Role, User, UserInstance } from '../../infrastructure/database/models'

@injectable()
export class UserSequelizeRepository implements IUserRepository {
  async findAll(): Promise<EntityUser[]> {
    const users = await (<Promise<UserInstance[]>>(
      User.findAll({ attributes: ['id', 'username', 'email'] })
    ))
    return users.map((user) => UserMapper.toDomain(user))
  }

  async findById(id: string): Promise<EntityUser> {
    const user = await User.findByPk<UserInstance>(id, {
      include: [Role],
    })
    if (!user) {
      throw {
        statusCode: 404,
        message: 'User was not found',
      }
    }
    // console.log(user.toJSON())
    return UserMapper.toDomain(user)
  }

  async create(userDomain: UnmarshalledUser): Promise<EntityUser> {
    try {
      const user = UserMapper.toEntity(userDomain)
      const userModel = await User.create(user.unmarshal())
      const entity = UserMapper.toDomain(userModel)
      return entity
    } catch (e) {
      throw {
        statusCode: 400,
        message: e,
      }
    }
  }

  async update(id: string, userDomain: UnmarshalledUser): Promise<EntityUser> {
    const user = await User.findByPk(id)
    if (!user) {
      throw {
        statusCode: 404,
        message: 'User was not found',
      }
    }
    await user.update(userDomain)
    await user.reload()
    const entity = UserMapper.toDomain(user)

    return entity
  }

  async delete(id: string): Promise<boolean> {
    const user = await User.findByPk(id)
    if (!user) {
      throw {
        statusCode: 404,
        message: 'Your fucking user was not found',
      }
    }
    await user.destroy()
    return true
  }
}
