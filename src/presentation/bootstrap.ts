import * as bodyParser from 'body-parser'
import express, { Request, Response, NextFunction } from 'express'
import { Routes } from './routes/routes'
import { AppError } from '../../src/libs/exceptions/app-error'
import { errorHandler } from '../../src/libs/exceptions/error-handler'
import { logger } from '../../src/libs/logger'
// class AppError extends Error {
//   statusCode: number

//   constructor(statusCode: number, message: string) {
//     super(message)

//     Object.setPrototypeOf(this, new.target.prototype)
//     this.name = Error.name
//     this.statusCode = statusCode
//     Error.captureStackTrace(this)
//   }
// }
export class Bootstrap {
  public app = express()

  constructor(private appRoutes: Routes) {
    this.app = express()
    this.middleware()
    this.setRoutes()
    this.middlewareError()
  }

  private middleware(): void {
    const requestLogger = (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      console.log(`${request.method} url:: ${request.url}`)
      next()
    }

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(requestLogger)
  }

  private middlewareError(): void {
    const errorLogger = (
      error: AppError,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      logger.error(error.error.toJson())
      // console.log(`error ${error.error.toJson()}`)
      next(error) // calling next middleware
    }

    const errorResponder = (
      error: AppError,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      errorHandler.handleError(error, response)
    }

    const invalidPathHandler = (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      response.status(400)
      response.send('invalid path')
    }

    this.app.use(errorLogger)
    this.app.use(errorResponder)
    this.app.use(invalidPathHandler)
  }

  private setRoutes(): void {
    const router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({
        message: 'server is up',
      })
    })

    this.appRoutes.setRoutes(router)

    this.app.use('/api', router)
  }
}
