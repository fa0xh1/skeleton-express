import { Router } from 'express'
import { inject, injectable } from 'inversify'
import asyncWrap from '../../../src/libs/asyncWrapper'
import { container } from '../../../src/container'
import UserController from '../controllers/user-controller'
import { TYPES } from '../../types'
import { AuthMiddleware } from '../middlewares/check-jwt'
import { PermissionMiddleware } from '../middlewares/check-permission'
@injectable()
export class UserRoutes {
  public route = 'User'
  UserControllerInstance = container.get<UserController>(UserController)

  constructor(
    @inject(TYPES.AuthMiddleware) private _authMiddleware: AuthMiddleware,
    @inject(TYPES.PermissionMiddleware)
    private _permissionMiddleware: PermissionMiddleware,
  ) {}
  public setRoutes(router: Router) {
    router.get(
      `/${this.route}`,
      [
        this._authMiddleware.checkJwt,
        this._permissionMiddleware.checkPermission(['can_read_users']),
      ],
      asyncWrap(
        this.UserControllerInstance.listUsers.bind(this.UserControllerInstance),
      ),
    )
    router.get(
      `/${this.route}/:id`,
      [
        this._authMiddleware.checkJwt,
        this._permissionMiddleware.checkPermission(['can_read_user']),
      ],
      asyncWrap(
        this.UserControllerInstance.findUserById.bind(
          this.UserControllerInstance,
        ),
      ),
    )
    router.put(
      `/${this.route}/:id`,
      [
        this._authMiddleware.checkJwt,
        this._permissionMiddleware.checkPermission(['can_update_user']),
      ],
      asyncWrap(
        this.UserControllerInstance.updateUser.bind(
          this.UserControllerInstance,
        ),
      ),
    )

    router.post(
      `/${this.route}`,
      asyncWrap(
        this.UserControllerInstance.createUser.bind(
          this.UserControllerInstance,
        ),
      ),
    )

    router.delete(
      `/${this.route}/:id`,
      [
        this._authMiddleware.checkJwt,
        this._permissionMiddleware.checkPermission(['can_read_user']),
      ],
      asyncWrap(
        this.UserControllerInstance.deleteUser.bind(
          this.UserControllerInstance,
        ),
      ),
    )
  }
}

// import { Router } from 'express'
// import { inject, injectable } from 'inversify'
// // import { UserMemoryRepository } from '../../../src/persistence/repository/user.repository'
// import { TYPES } from '../../types'
// import { UserDtoMapper } from '../../../src/dtos/mappers/user'
// // import { UserService } from '../../../src/services/user'
// @injectable()
// export class UserRoutes {
//   public route = 'User'
//   @inject(TYPES.UserController) private _userController: UserController
//   public setRoutes(router: Router) {
//     router.get(`/${this.route}`, async (req, res, next) => {
//       try {
//         const users = await this._userController.findAll()
//         res.status(200).send(users.map((val) => val.unmarshal()))
//       } catch (e) {
//         res.status(500)
//         res.send(e.message)
//       }
//     })
//     router.post(`/${this.route}`, async (req, res, next) => {
//       try {
//         const user = UserDtoMapper.toDto(req.body)
//         const userService = await this._userController.create(user)
//         res.status(200).send(userService)
//       } catch (e) {
//         res.status(500)
//         res.send(e.message)
//       }
//     })
//   }
// }
