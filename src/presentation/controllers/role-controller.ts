import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { RoleService } from '../../services/role-service'
import { RoleMapper } from '../../dtos/mappers/role-mapper'
import {
  roleCreateScheme,
  roleUpdateScheme,
} from '../../presentation/validation/role-validation'
import { HttpCode, AppError } from '../../libs/exceptions/app-error'

@injectable()
export default class RoleController {
  constructor(@inject(TYPES.RoleService) private _roleService: RoleService) {}

  public async listRoles(req: Request, res: Response): Promise<void> {
    const roles = await this._roleService.findAll()
    res.status(200).send(roles.map((val) => val))
  }
  public async findRoleById(req: Request, res: Response): Promise<void> {
    const role = await this._roleService.findById(req.params.id)
    res.status(200).send(role)
  }
  public async createRole(req: Request, res: Response): Promise<void> {
    const parseBody = roleCreateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const role = RoleMapper.requestToDto(parseBody.data)
    const roleService = await this._roleService.create(role)
    res.status(200).send(roleService)
  }
  public async updateRole(req: Request, res: Response): Promise<void> {
    const parseBody = roleUpdateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const role = RoleMapper.requestToDto(parseBody.data)
    const roleService = await this._roleService.update(req.params.id, role)
    res.status(200).send(roleService)
  }
}
