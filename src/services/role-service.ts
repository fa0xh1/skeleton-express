import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IRoleRepository } from '../domain/service/interface-role-repository'
import { RoleCreateDto, RoleDto } from '../../src/dtos/role-dto'
import { RoleMapper } from '../../src/dtos/mappers/role-mapper'

@injectable()
export class RoleService {
  @inject(TYPES.RoleRepository) private _repository!: IRoleRepository

  public async findAll(): Promise<RoleDto[]> {
    const roles = await this._repository.findAll()
    const roleDtos = roles.map((role) => RoleMapper.domainToDto(role))
    return roleDtos
  }

  public async findById(id: string): Promise<RoleDto> {
    const role = await this._repository.findById(id)
    const roleDto = RoleMapper.domainToDto(role)
    return roleDto
  }

  public async create(_role: RoleCreateDto): Promise<RoleDto> {
    const roleDomain = RoleMapper.dtoToDomain(_role)
    const role = await this._repository.create(roleDomain)
    const roleDto = RoleMapper.domainToDto(role)
    return roleDto
  }

  public async update(id: string, _role: RoleCreateDto): Promise<RoleDto> {
    const roleDomain = RoleMapper.dtoToDomain(_role)
    const role = await this._repository.update(id, roleDomain)
    const roleDto = RoleMapper.domainToDto(role)
    return roleDto
  }
}
