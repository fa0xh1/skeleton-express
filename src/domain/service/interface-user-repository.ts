import { UnmarshalledUser, User } from '../models/user'

export interface IUserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  create(user: User): Promise<User>
  update(id: string, user: UnmarshalledUser): Promise<User>
  delete(id: string): Promise<boolean>
}
