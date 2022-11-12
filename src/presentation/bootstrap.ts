import * as bodyParser from 'body-parser'
import express, { Request, Response, NextFunction } from 'express'
import { Routes } from './routes/routes'

class AppError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}
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
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      console.log(`error ${error.message}`)
      next(error) // calling next middleware
    }

    const errorResponder = (
      error: AppError,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      response.header('Content-Type', 'application/json')

      const status = error.statusCode || 400
      response.status(status).send(error)
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
