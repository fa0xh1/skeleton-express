import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { RoleService } from '../../../src/services/role-service'
import { RoleMapper } from '../../../src/dtos/mappers/role-mapper'

@injectable()
export default class RoleController {
  @inject(TYPES.RoleService) private _roleService: RoleService
  constructor(roleService: RoleService) {
    this._roleService = roleService
  }
  public async listRoles(req: Request, res: Response): Promise<void> {
    const roles = await this._roleService.findAll()
    res.status(200).send(roles.map((val) => val))
  }
  public async findRoleById(req: Request, res: Response): Promise<void> {
    const role = await this._roleService.findById(req.params.id)
    res.status(200).send(role)
  }
  public async createRole(req: Request, res: Response): Promise<void> {
    const role = RoleMapper.requestToDto(req.body)
    const roleService = await this._roleService.create(role)
    res.status(200).send(roleService)
  }
  public async updateRole(req: Request, res: Response): Promise<void> {
    const role = RoleMapper.requestToDto(req.body)
    const roleService = await this._roleService.update(req.params.id, role)
    res.status(200).send(roleService)
  }
}
