import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../libs/asyncWrapper'
import { container } from '../../container'
import RoleController from '../controllers/role-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'

@injectable()
export class RoleRoutes {
  public route = 'Role'
  RoleControllerInstance = container.get<RoleController>(RoleController)

  constructor(
    @inject(TYPES.AuthMiddleware) private _authMiddleware: AuthMiddleware,
  ) {}
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      // [this._authMiddleware.checkJwt],
      asyncWrap(
        this.RoleControllerInstance.listRoles.bind(this.RoleControllerInstance),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      asyncWrap(
        this.RoleControllerInstance.findRoleById.bind(
          this.RoleControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      asyncWrap(
        this.RoleControllerInstance.updateRole.bind(
          this.RoleControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.RoleControllerInstance.createRole.bind(
          this.RoleControllerInstance,
        ),
      ),
    )
  }
}
