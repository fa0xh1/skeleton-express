import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { PermissionService } from '../../services/permission-service'
import { PermissionMapper } from '../../dtos/mappers/permission-mapper'
import {
  permissionCreateScheme,
  permissionUpdateScheme,
} from '../../presentation/validation/permission-validation'
import { AppError, HttpCode } from '../../libs/exceptions/app-error'

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
    const parseBody = permissionCreateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const permission = PermissionMapper.requestToDto(parseBody.data)
    const permissionService = await this._permissionService.create(permission)
    res.status(200).send(permissionService)
  }
  public async updatePermission(req: Request, res: Response): Promise<void> {
    const parseBody = permissionUpdateScheme.safeParse(req.body)
    if (!parseBody.success) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Request validation error',
        data: parseBody.error.flatten(),
      })
    }
    const Permission = PermissionMapper.requestToDto(parseBody.data)
    const PermissionService = await this._permissionService.update(
      req.params.id,
      Permission,
    )
    res.status(200).send(PermissionService)
  }
}
