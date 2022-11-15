import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IAccessControll } from '../domain/service/interface-access-controll'
import { UserRoleCreateDto } from '../../src/dtos/role-dto'
import {
  RoleHasPermissionMapper,
  UserHasRoleMapper,
} from '../../src/dtos/mappers/access-controll-mapper'
import { RolePermissionCreateDto } from 'src/dtos/permission-dto'

@injectable()
export class AccessControllService {
  @inject(TYPES.AccessControllManager) private _accessControll: IAccessControll
  constructor(accessControll: IAccessControll) {
    this._accessControll = accessControll
  }
  public async addRoleUser(_userHasRole: UserRoleCreateDto): Promise<string> {
    const userDomain = UserHasRoleMapper.dtoToDomain(_userHasRole)
    const role = await this._accessControll.addRoleToUser(userDomain)
    return role
  }

  public async removeRoleUser(
    _userHasRole: UserRoleCreateDto,
  ): Promise<string> {
    const userDomain = UserHasRoleMapper.dtoToDomain(_userHasRole)
    const role = await this._accessControll.removeRoleFromUser(userDomain)
    return role
  }

  public async addPermisisonRole(
    _roleHasPermission: RolePermissionCreateDto,
  ): Promise<string> {
    const roleDomain = RoleHasPermissionMapper.dtoToDomain(_roleHasPermission)
    const role = await this._accessControll.addPermissionToRole(roleDomain)
    return role
  }

  public async removePermisisonRole(
    _roleHasPermission: RolePermissionCreateDto,
  ): Promise<string> {
    const roleDomain = RoleHasPermissionMapper.dtoToDomain(_roleHasPermission)
    const role = await this._accessControll.removePermissionFromRole(roleDomain)
    return role
  }
}
