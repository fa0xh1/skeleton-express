import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import BankController from '../controllers/bank-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'
@injectable()
export class BankRoutes {
  public route = 'payment/bank'
  BankControllerInstance = container.get<BankController>(BankController)
  @inject(TYPES.AuthMiddleware) private _authMiddleware!: AuthMiddleware
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.BankControllerInstance.listBanks.bind(this.BankControllerInstance),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      asyncWrap(
        this.BankControllerInstance.findBankById.bind(
          this.BankControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      asyncWrap(
        this.BankControllerInstance.updateBank.bind(
          this.BankControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.BankControllerInstance.createBank.bind(
          this.BankControllerInstance,
        ),
      ),
    )

    router.delete(
      `/${this.route}/:id`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.BankControllerInstance.deleteBank.bind(
          this.BankControllerInstance,
        ),
      ),
    )
  }
}
