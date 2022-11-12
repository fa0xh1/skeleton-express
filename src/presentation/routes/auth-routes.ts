import { Router } from 'express'
import { injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import AuthController from '../controllers/auth-controller'
@injectable()
export class AuthRoutes {
  public route = 'Auth'
  UserControllerInstance = container.get<AuthController>(AuthController)
  public setRoutes(router: Router) {
    router.post(
      `/${this.route}/login`,
      asyncWrap(
        this.UserControllerInstance.login.bind(this.UserControllerInstance),
      ),
    )
  }
}
