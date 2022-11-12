import { Permission as EntityPermission } from '../../domain/models/permission'
import { IPermissionRepository } from '../../domain/service/interface-permission-repository'
import { injectable } from 'inversify'
import { ResourceNotFound } from '../../../src/libs/errors'
import { PermissionMapper } from '../../../src/dtos/mappers/permission-mapper'
import {
  Permission,
  PermissionInstance,
} from '../../infrastructure/database/models'
import { PermissionCreateDto } from 'src/dtos/permission-dto'

@injectable()
export class PermissionSequelizeRepository implements IPermissionRepository {
  async findAll(): Promise<EntityPermission[]> {
    const permissions = await (<Promise<PermissionInstance[]>>(
      Permission.findAll({ attributes: ['id', 'name', 'description'] })
    ))
    return permissions.map((permission) =>
      PermissionMapper.toDomain(permission),
    )
  }

  async findById(id: string): Promise<EntityPermission> {
    const permission = await Permission.findByPk<PermissionInstance>(id)
    if (!permission) {
      throw new ResourceNotFound('Permission', { id })
    }

    return PermissionMapper.toDomain(permission)
  }

  async create(permissionDto: PermissionCreateDto): Promise<EntityPermission> {
    const permission = PermissionMapper.toEntity(permissionDto)
    const permissionModel = await Permission.create(permission.unmarshal())
    const entity = PermissionMapper.toDomain(permissionModel)
    return entity
  }

  async update(
    id: string,
    permissionDto: PermissionCreateDto,
  ): Promise<EntityPermission> {
    const permission = await Permission.findByPk(id)
    if (!permission) {
      throw {
        statusCode: 404,
        message: 'Permission was not found',
      }
    }
    await permission.update(permissionDto)
    await permission.reload()
    const entity = PermissionMapper.toDomain(permission)

    return entity
  }
}
