import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { UserService } from '../../../src/services/user-service'
import { UserMapper } from '../../../src/dtos/mappers/user-mapper'
// import { Authorization } from '../../../src/libs/authorization'

@injectable()
export default class UserController {
  constructor(@inject(TYPES.UserService) private _userService: UserService) {}

  public async listUsers(req: Request, res: Response): Promise<Response> {
    // const userSession: Authorization = await res.locals.Authorization
    const users = await this._userService.findAll()
    return res.status(200).send(users.map((val) => val))
  }

  public async findUserById(req: Request, res: Response): Promise<Response> {
    const user = await this._userService.findById(req.params.id)
    return res.status(200).send(user)
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const user = UserMapper.requestToDto(req.body)
    const userService = await this._userService.create(user)
    return res.status(200).send(userService)
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const user = UserMapper.requestToDto(req.body)
    const userService = await this._userService.update(req.params.id, user)
    return res.status(200).send(userService)
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const user = await this._userService.delete(req.params.id)
    return res.status(200).send(user)
  }
}
