import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import PaymentMethodController from '../controllers/payment-method-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'
@injectable()
export class PaymentMethodRoutes {
  public route = 'payment/method'
  PaymentMethodControllerInstance = container.get<PaymentMethodController>(
    PaymentMethodController,
  )
  @inject(TYPES.AuthMiddleware) private _authMiddleware!: AuthMiddleware
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.PaymentMethodControllerInstance.listPaymentMethods.bind(
          this.PaymentMethodControllerInstance,
        ),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      asyncWrap(
        this.PaymentMethodControllerInstance.findPaymentMethodById.bind(
          this.PaymentMethodControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      asyncWrap(
        this.PaymentMethodControllerInstance.updatePaymentMethod.bind(
          this.PaymentMethodControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.PaymentMethodControllerInstance.createPaymentMethod.bind(
          this.PaymentMethodControllerInstance,
        ),
      ),
    )

    router.delete(
      `/${this.route}/:id`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.PaymentMethodControllerInstance.deletePaymentMethod.bind(
          this.PaymentMethodControllerInstance,
        ),
      ),
    )
  }
}
