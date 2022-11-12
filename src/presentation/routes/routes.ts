import { Router } from 'express'
import { injectable } from 'inversify'
import { UserRoutes } from './user-routes'
import { AuthRoutes } from './auth-routes'
import { AccessControllRoutes } from './access-controll-routes'
import { RoleRoutes } from './role-routes'
import { PermissionRoutes } from './permission-routes'

@injectable()
export class Routes {
  constructor(
    private authRoutes: AuthRoutes,
    private accessControllRoutes: AccessControllRoutes,
    private userRoutes: UserRoutes,
    private roleRoutes: RoleRoutes,
    private permissionRoutes: PermissionRoutes,
  ) {}

  public setRoutes(router: Router) {
    this.authRoutes.setRoutes(router)
    this.userRoutes.setRoutes(router)
    this.roleRoutes.setRoutes(router)
    this.permissionRoutes.setRoutes(router)
    this.accessControllRoutes.setRoutes(router)
  }
}
