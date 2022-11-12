import { Router } from 'express'
import { injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import AccessControll from '../controllers/access-controll-controller'
@injectable()
export class AccessControllRoutes {
  public route = 'access-controll'
  AccessControllControllerInstance =
    container.get<AccessControll>(AccessControll)
  public setRoutes(router: Router) {
    router.put(
      `/${this.route}/add-role-user`,
      asyncWrap(
        this.AccessControllControllerInstance.addRoleUser.bind(
          this.AccessControllControllerInstance,
        ),
      ),
    )

    router.put(
      `/${this.route}/add-permission-role`,
      asyncWrap(
        this.AccessControllControllerInstance.addPermisisonRole.bind(
          this.AccessControllControllerInstance,
        ),
      ),
    )

    router.put(
      `/${this.route}/remove-role-user`,
      asyncWrap(
        this.AccessControllControllerInstance.removeRoleUser.bind(
          this.AccessControllControllerInstance,
        ),
      ),
    )
  }
}
