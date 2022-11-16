import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IUserRepository } from '../domain/service/interface-user-repository'
import { UserCreateDto, UserUpdateDto, UserDto } from '../dtos/user-dto'
import { UserMapper } from '../dtos/mappers/user-mapper'

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private _repository: IUserRepository,
  ) {}

  public async findAll(): Promise<UserDto[]> {
    const users = await this._repository.findAll()
    const userDto = users.map((user) => UserMapper.domainToDto(user))
    return userDto
  }

  public async findById(id: string): Promise<UserDto> {
    const user = await this._repository.findById(id)
    const userDto = UserMapper.domainToDto(user)
    return userDto
  }

  public async create(_user: UserCreateDto): Promise<UserDto> {
    const userDomain = UserMapper.dtoToEntity(_user)
    const user = await this._repository.create(userDomain)
    const userDto = UserMapper.domainToDto(user)
    return userDto
  }

  public async update(id: string, _user: UserUpdateDto): Promise<UserDto> {
    const userDomain = UserMapper.dtoToDomain(_user)
    const user = await this._repository.update(id, userDomain)
    const userDto = UserMapper.domainToDto(user)
    return userDto
  }

  public async delete(id: string): Promise<boolean> {
    const user = await this._repository.delete(id)
    return user
  }
}
