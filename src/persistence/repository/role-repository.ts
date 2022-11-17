import { Role as EntityRole } from '../../domain/models/role'
import { IRoleRepository } from '../../domain/service/interface-role-repository'
import { injectable } from 'inversify'
import { ResourceNotFound } from '../../libs/errors'
import { RoleMapper } from '../../dtos/mappers/role-mapper'
import { Role, RoleInstance } from '../../infrastructure/database/models'
import { RoleCreateDto } from '../../dtos/role-dto'
@injectable()
export class RoleSequelizeRepository implements IRoleRepository {
  async findAll(): Promise<EntityRole[]> {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'description'],
    })

    return roles.map((role) => RoleMapper.toDomain(role))
  }

  async findById(id: string): Promise<EntityRole> {
    const role = await Role.findByPk<RoleInstance>(id)
    if (!role) {
      throw new ResourceNotFound('Role', { id })
    }

    return RoleMapper.toDomain(role)
  }

  async create(roleDto: RoleCreateDto): Promise<EntityRole> {
    try {
      const role = RoleMapper.toEntity(roleDto)
      const roleModel = await Role.create(role.unmarshal())
      const entity = RoleMapper.toDomain(roleModel)
      return entity
    } catch (e) {
      throw {
        statusCode: 500,
        message: e,
      }
    }
  }

  async update(id: string, roleDto: RoleCreateDto): Promise<EntityRole> {
    const role = await Role.findByPk(id)
    if (!role) {
      throw {
        statusCode: 404,
        message: 'Role was not found',
      }
    }
    await role.update(roleDto)
    await role.reload()
    const entity = RoleMapper.toDomain(role)

    return entity
  }
}
