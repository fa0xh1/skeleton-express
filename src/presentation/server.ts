import { injectable } from 'inversify'
import { container } from '../../src/container'
import { Bootstrap } from './bootstrap'
import { Routes } from './routes/routes'
const port = process.env.PORT || 3000

export interface IServer {
  start(): void
}
@injectable()
export class Server implements IServer {
  start(): void {
    const app = new Bootstrap(container.resolve<Routes>(Routes)).app
    app.set('port', port)
    app.listen(port, () => {
      console.log(`Server started at port ${port}`)
    })
  }
}

// module.exports = { app }
