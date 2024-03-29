import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IPermissionRepository } from '../domain/service/interface-permission-repository'
import { PermissionCreateDto, PermissionDto } from '../dtos/permission-dto'
import { PermissionMapper } from '../dtos/mappers/permission-mapper'

@injectable()
export class PermissionService {
  constructor(
    @inject(TYPES.PermissionRepository)
    private _repository: IPermissionRepository,
  ) {}

  public async findAll(): Promise<PermissionDto[]> {
    const permissions = await this._repository.findAll()
    const permissionDtos = permissions.map((permission) =>
      PermissionMapper.domainToDto(permission),
    )
    return permissionDtos
  }
  public async findById(id: string): Promise<PermissionDto> {
    const permission = await this._repository.findById(id)
    const permissionDto = PermissionMapper.domainToDto(permission)
    return permissionDto
  }
  public async create(
    _permission: PermissionCreateDto,
  ): Promise<PermissionDto> {
    const permissionDomain = PermissionMapper.dtoToDomain(_permission)
    const permission = await this._repository.create(permissionDomain)
    const permissionDto = PermissionMapper.domainToDto(permission)
    return permissionDto
  }
  public async update(
    id: string,
    _permission: PermissionCreateDto,
  ): Promise<PermissionDto> {
    const permissionDomain = PermissionMapper.dtoToDomain(_permission)
    const permission = await this._repository.update(id, permissionDomain)
    const permissionDto = PermissionMapper.domainToDto(permission)
    return permissionDto
  }
}
