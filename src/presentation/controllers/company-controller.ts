import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CompanyService } from '../../../src/services/company-service'
import { CompanyMapper } from '../../../src/dtos/mappers/company-mapper'

@injectable()
export default class CompanyController {
  @inject(TYPES.CompanyService) private _companyService!: CompanyService

  public async listCompanies(req: Request, res: Response): Promise<void> {
    const companies = await this._companyService.findAll()
    res.status(200).send(companies.map((val) => val))
  }

  public async findCompanyById(req: Request, res: Response): Promise<void> {
    const company = await this._companyService.findById(req.params.id)
    res.status(200).send(company)
  }

  public async createCompany(req: Request, res: Response): Promise<void> {
    const company = CompanyMapper.requestToDto(req.body)
    const companyService = await this._companyService.create(company)
    res.status(200).send(companyService)
  }

  public async updateCompany(req: Request, res: Response): Promise<void> {
    const company = CompanyMapper.requestToDto(req.body)
    const companyService = await this._companyService.update(
      req.params.id,
      company,
    )
    res.status(200).send(companyService)
  }

  public async deleteCompany(req: Request, res: Response): Promise<Response> {
    const company = await this._companyService.delete(req.params.id)
    return res.status(200).send(company)
  }
}
