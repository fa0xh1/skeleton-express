import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import PermissionController from '../controllers/permission-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'

@injectable()
export class PermissionRoutes {
  public route = 'Permission'
  PermissionControllerInstance =
    container.get<PermissionController>(PermissionController)
  @inject(TYPES.AuthMiddleware) private _authMiddleware: AuthMiddleware
  constructor(authMiddleware: AuthMiddleware) {
    this._authMiddleware = authMiddleware
  }
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      [this._authMiddleware.checkJwt],
      asyncWrap(
        this.PermissionControllerInstance.listPermissions.bind(
          this.PermissionControllerInstance,
        ),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      asyncWrap(
        this.PermissionControllerInstance.findPermissionById.bind(
          this.PermissionControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      asyncWrap(
        this.PermissionControllerInstance.updatePermission.bind(
          this.PermissionControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.PermissionControllerInstance.createPermission.bind(
          this.PermissionControllerInstance,
        ),
      ),
    )
  }
}
