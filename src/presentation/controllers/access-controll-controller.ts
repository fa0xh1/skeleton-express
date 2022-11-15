import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import {
  UserHasRoleMapper,
  RoleHasPermissionMapper,
} from '../../../src/dtos/mappers/access-controll-mapper'
import { AccessControllService } from '../../../src/services/access-controll'
import { TYPES } from '../../types'
@injectable()
export default class AccessControllController {
  constructor(
    @inject(TYPES.AccessControllService)
    private _accessControll: AccessControllService,
  ) {}
  public async addRoleUser(req: Request, res: Response): Promise<Response> {
    const userRoleCreateDto = UserHasRoleMapper.requestToDto(req.body)
    const accessControll = await this._accessControll.addRoleUser(
      userRoleCreateDto,
    )
    return res.status(200).send({
      success: true,
      message: accessControll,
    })
  }

  public async addPermisisonRole(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const rolePermissionCreateDto = RoleHasPermissionMapper.requestToDto(
      req.body,
    )
    const accessControll = await this._accessControll.addPermisisonRole(
      rolePermissionCreateDto,
    )
    return res.status(200).send({
      success: true,
      message: accessControll,
    })
  }

  public async removeRoleUser(req: Request, res: Response): Promise<Response> {
    const userRoleRemoveDto = UserHasRoleMapper.requestToDto(req.body)
    const accessControll = await this._accessControll.removeRoleUser(
      userRoleRemoveDto,
    )
    return res.status(200).send({
      success: true,
      message: accessControll,
    })
  }

  public async removePermission(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const rolePermissionRemoveDto = RoleHasPermissionMapper.requestToDto(
      req.body,
    )
    const accessControll = await this._accessControll.removePermisisonRole(
      rolePermissionRemoveDto,
    )

    return res.status(200).send({
      success: true,
      message: accessControll,
    })
  }
}
