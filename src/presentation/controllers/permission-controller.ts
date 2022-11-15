import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { PermissionService } from '../../../src/services/permission-service'
import { PermissionMapper } from '../../../src/dtos/mappers/permission-mapper'

@injectable()
export default class PermissionController {
  constructor(
    @inject(TYPES.PermissionService)
    private _permissionService: PermissionService,
  ) {}

  public async listPermissions(req: Request, res: Response): Promise<void> {
    const permissions = await this._permissionService.findAll()
    res.status(200).send(permissions.map((val) => val))
  }
  public async findPermissionById(req: Request, res: Response): Promise<void> {
    const permission = await this._permissionService.findById(req.params.id)
    res.status(200).send(permission)
  }
  public async createPermission(req: Request, res: Response): Promise<void> {
    const permission = PermissionMapper.requestToDto(req.body)
    const permissionService = await this._permissionService.create(permission)
    res.status(200).send(permissionService)
  }
  public async updatePermission(req: Request, res: Response): Promise<void> {
    const Permission = PermissionMapper.requestToDto(req.body)
    const PermissionService = await this._permissionService.update(
      req.params.id,
      Permission,
    )
    res.status(200).send(PermissionService)
  }
}
