import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import CompanyController from '../controllers/company-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'
@injectable()
export class CompanyRoutes {
  public route = 'Company'
  CompanyControllerInstance =
    container.get<CompanyController>(CompanyController)
  @inject(TYPES.AuthMiddleware) private _authMiddleware!: AuthMiddleware
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.CompanyControllerInstance.listCompanies.bind(
          this.CompanyControllerInstance,
        ),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      asyncWrap(
        this.CompanyControllerInstance.findCompanyById.bind(
          this.CompanyControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      asyncWrap(
        this.CompanyControllerInstance.updateCompany.bind(
          this.CompanyControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.CompanyControllerInstance.createCompany.bind(
          this.CompanyControllerInstance,
        ),
      ),
    )
  }
}
