import { Company, UnmarshalledCompany } from '../../domain/models/company'

export interface ICompanyRepository {
  findAll(): Promise<Company[]>
  findById(id: string): Promise<Company>
  create(company: UnmarshalledCompany): Promise<Company>
  update(id: string, company: UnmarshalledCompany): Promise<Company>
  delete(id: string): Promise<boolean>
}
