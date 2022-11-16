import { Router } from 'express'
import { injectable, inject } from 'inversify'
import asyncWrap from '../../libs/asyncWrapper'
import { container } from '../../container'
import AuthController from '../controllers/auth-controller'
import { AuthMiddleware } from '../middlewares/check-jwt'
import { TYPES } from '../../types'
@injectable()
export class AuthRoutes {
  public route = 'Auth'
  AuthControllerInstance = container.get<AuthController>(AuthController)

  constructor(
    @inject(TYPES.AuthMiddleware) private _authMiddleware: AuthMiddleware,
  ) {}
  public setRoutes(router: Router) {
    router.post(
      `/${this.route}/login`,
      asyncWrap(
        this.AuthControllerInstance.login.bind(this.AuthControllerInstance),
      ),
    )
    router.get(
      `/${this.route}/me`,
      this._authMiddleware.checkJwt,
      asyncWrap(
        this.AuthControllerInstance.me.bind(this.AuthControllerInstance),
      ),
    )
  }
}
