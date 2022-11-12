import { container } from './container'
import { TYPES } from './types'
import { IServer } from './presentation/server'

const start = async () => {
  const server = container.get<IServer>(TYPES.Server)
  return server.start()
}
start()
