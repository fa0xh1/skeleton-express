import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ICompanyRepository } from '../domain/service/interface-company-repository'
import { CompanyCreateDto, CompanyDto } from '../../src/dtos/company-dto'
import { CompanyMapper } from '../../src/dtos/mappers/company-mapper'

@injectable()
export class CompanyService {
  @inject(TYPES.CompanyRepository) private _repository!: ICompanyRepository

  public async findAll(): Promise<CompanyDto[]> {
    const companys = await this._repository.findAll()
    const companyDtos = companys.map((company) =>
      CompanyMapper.domainToDto(company),
    )
    return companyDtos
  }

  public async findById(id: string): Promise<CompanyDto> {
    const company = await this._repository.findById(id)
    const companyDto = CompanyMapper.domainToDto(company)
    return companyDto
  }

  public async create(_company: CompanyCreateDto): Promise<CompanyDto> {
    const companyDomain = CompanyMapper.dtoToDomain(_company)
    const company = await this._repository.create(companyDomain)
    const companyDto = CompanyMapper.domainToDto(company)
    return companyDto
  }

  public async update(
    id: string,
    _company: CompanyCreateDto,
  ): Promise<CompanyDto> {
    const companyDomain = CompanyMapper.dtoToDomain(_company)
    const company = await this._repository.update(id, companyDomain)
    const companyDto = CompanyMapper.domainToDto(company)
    return companyDto
  }
}
