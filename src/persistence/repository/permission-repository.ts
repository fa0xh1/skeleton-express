import {
  Permission as EntityPermission,
  UnmarshalledPermission,
} from '../../domain/models/permission'
import { IPermissionRepository } from '../../domain/service/interface-permission-repository'
import { injectable } from 'inversify'
import { PermissionMapper } from '../../dtos/mappers/permission-mapper'
import {
  Permission,
  PermissionInstance,
} from '../../infrastructure/database/models'
import { PermissionCreateDto } from '../../dtos/permission-dto'
import { AppError, HttpCode } from '../../libs/exceptions/app-error'

@injectable()
export class PermissionSequelizeRepository implements IPermissionRepository {
  async findAll(): Promise<EntityPermission[]> {
    const permissions = await Permission.findAll({
      attributes: ['id', 'name', 'description'],
    })

    return permissions.map((permission) =>
      PermissionMapper.toDomain(permission),
    )
  }

  async findById(id: string): Promise<EntityPermission> {
    const permission = await Permission.findByPk<PermissionInstance>(id)
    if (!permission) {
      throw new AppError({
        statusCode: HttpCode.NOT_FOUND,
        description: 'Role was not found',
      })
    }

    return PermissionMapper.toDomain(permission)
  }

  async create(
    permissionDomain: UnmarshalledPermission,
  ): Promise<EntityPermission> {
    try {
      const permission = PermissionMapper.toEntity(permissionDomain)
      const permissionModel = await Permission.create(permission.unmarshal())
      const entity = PermissionMapper.toDomain(permissionModel)
      return entity
    } catch (e) {
      throw new AppError({
        statusCode: HttpCode.BAD_REQUEST,
        description: 'Failed to create permission',
        error: e,
      })
    }
  }

  async update(
    id: string,
    permissionDomain: PermissionCreateDto,
  ): Promise<EntityPermission> {
    const permission = await Permission.findByPk(id)
    if (!permission) {
      throw new AppError({
        statusCode: HttpCode.NOT_FOUND,
        description: 'Role was not found',
      })
    }
    await permission.update(permissionDomain)
    await permission.reload()
    const entity = PermissionMapper.toDomain(permission)

    return entity
  }
}
