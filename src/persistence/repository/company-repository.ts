import { Company as EntityCompany } from '../../domain/models/company'
import { ICompanyRepository } from '../../domain/service/interface-company-repository'
import { injectable } from 'inversify'
import { ResourceNotFound } from '../../../src/libs/errors'
import { CompanyMapper } from '../../../src/dtos/mappers/company-mapper'
import {
  Company,
  CompanyInstance,
} from '../../../src/infrastructure/database/models'
import { CompanyCreateDto } from '../../../src/dtos/company-dto'
@injectable()
export class RoleSequelizeRepository implements ICompanyRepository {
  async findAll(): Promise<EntityCompany[]> {
    const companies = await (<Promise<CompanyInstance[]>>Company.findAll({
      attributes: [
        'id',
        'company_name',
        'company_code',
        'type',
        'email',
        'website',
        'status',
      ],
    }))
    return companies.map((company) => CompanyMapper.toDomain(company))
  }

  async findById(id: string): Promise<EntityCompany> {
    const company = await Company.findByPk<CompanyInstance>(id)
    if (!company) {
      throw new ResourceNotFound('Company', { id })
    }

    return CompanyMapper.toDomain(company)
  }

  async create(companyDto: CompanyCreateDto): Promise<EntityCompany> {
    try {
      const company = CompanyMapper.toEntity(companyDto)
      const companyModel = await Company.create(company.unmarshal())
      const entity = CompanyMapper.toDomain(companyModel)
      return entity
    } catch (e) {
      throw {
        statusCode: 500,
        message: e,
      }
    }
  }

  async update(
    id: string,
    companyDto: CompanyCreateDto,
  ): Promise<EntityCompany> {
    const company = await Company.findByPk(id)
    if (!company) {
      throw {
        statusCode: 404,
        message: 'Company was not found',
      }
    }
    await company.update(companyDto)
    await company.reload()
    const entity = CompanyMapper.toDomain(company)

    return entity
  }
}
