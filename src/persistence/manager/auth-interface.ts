import { User } from '../../../src/domain/models/user'
import { AuthForLoginDto } from '../../dtos/user-dto'
export interface IAuthManager {
  authentication(authDto: AuthForLoginDto): Promise<string>
  me(id: string): Promise<User>
}
