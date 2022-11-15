import { Company, UnmarshalledCompany } from '../../domain/models/company'

export interface ICompanyRepository {
  findAll(): Promise<Company[]>
  findById(id: string): Promise<Company>
  create(user: UnmarshalledCompany): Promise<Company>
  update(id: string, user: UnmarshalledCompany): Promise<Company>
  // delete(id: string): Promise<boolean>
}
