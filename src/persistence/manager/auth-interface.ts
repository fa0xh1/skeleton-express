import { AuthForLoginDto } from '../../dtos/user-dto'
export interface IAuthManager {
  authentication(authDto: AuthForLoginDto): Promise<string>
}
