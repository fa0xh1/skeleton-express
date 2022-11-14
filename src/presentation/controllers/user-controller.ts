import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { UserService } from '../../../src/services/user-service'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
import { Authorization, UserSession } from '../../../src/libs/authorization'
import { IAdminPrincipal } from '../../../src/libs/authorization'

@injectable()
export default class UserController {
  @inject(TYPES.UserService) private _userService!: UserService

  public async listUsers(req: Request, res: Response): Promise<void> {
    const userSession: Authorization = await res.locals.Authorization

    const users = await this._userService.findAll(userSession.authorizeAdmin())
    res.status(200).send(users.map((val) => val))
  }

  public async findUserById(req: Request, res: Response): Promise<void> {
    const user = await this._userService.findById(req.params.id)
    res.status(200).send(user)
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const user = UserMapper.requestToDto(req.body)
    const userService = await this._userService.create(user)
    res.status(200).send(userService)
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const user = UserMapper.requestToDto(req.body)
    const userService = await this._userService.update(req.params.id, user)
    res.status(200).send(userService)
  }
}
