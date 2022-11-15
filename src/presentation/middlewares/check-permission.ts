import { Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import { Authorization } from '../../../src/libs/authorization'
@injectable()
export class PermissionMiddleware {
  checkPermission = (permissions: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization: Authorization = res.locals.Authorization
      if (authorization.role != undefined) {
        const authPermissions = authorization.role
          ?.map((val) => val.permissions.map((val) => val.name))
          .flat(1)
        let doesntHavePermission = false
        for (const permission of permissions) {
          if (authPermissions.find((item) => item == permission)) {
            doesntHavePermission = true
          }
        }
        if (!doesntHavePermission) {
          return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized!',
          })
        }
      } else {
        return res.status(401).send({
          statusCode: 401,
          message: 'Unauthorized',
        })
      }
      //Get user role from the database
      next()
    }
  }
}
