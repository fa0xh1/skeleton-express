import { Application } from 'express'
import { injectable } from 'inversify'
import { container } from '../container'
import { Bootstrap } from './bootstrap'
import { Routes } from './routes/routes'
const port = process.env.PORT || 3000

export interface IServer {
  start(): Application
}
@injectable()
export class Server implements IServer {
  start(): Application {
    const app = new Bootstrap(container.resolve<Routes>(Routes)).app
    app.set('port', port)
    app.listen(port, () => {
      console.log(`Server started at port ${port}`)
    })
    return app
  }
}
