import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { UserService } from '../../services/user-service'
import { UserMapper } from '../../dtos/mappers/user-mapper'
// import { Authorization } from '@/libs/authorization'
import {
  userCreateScheme,
  userUpdateScheme,
} from '../validation/user-validation'
import { HttpCode, AppError } from '../../libs/exceptions/app-error'
@injectable()
export default class UserController {
  constructor(@inject(TYPES.UserService) private _userService: UserService) {}

  public async listUsers(req: Request, res: Response): Promise<Response> {
    const users = await this._userService.findAll()
    return res.status(200).send(users.map((val) => val))
  }

  public async findUserById(req: Request, res: Response): Promise<Response> {
    const user = await this._userService.findById(req.params.id)
    return res.status(200).send(user)
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const parseBody = userCreateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const user = UserMapper.requestToDto(parseBody.data)
    const userService = await this._userService.create(user)
    return res.status(200).send(userService)
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const parseBody = userUpdateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const user = UserMapper.requestToDto(parseBody.data)
    const userService = await this._userService.update(req.params.id, user)
    return res.status(200).send(userService)
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const user = await this._userService.delete(req.params.id)
    return res.status(200).send(user)
  }
}
