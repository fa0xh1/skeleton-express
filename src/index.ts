import http from 'http'
import { createHttpTerminator } from 'http-terminator'
import { container } from './container'
import { TYPES } from './types'
import { IServer } from './presentation/server'
import { Application } from 'express'

const start = (): Application => {
  const server = container.get<IServer>(TYPES.Server)
  return server.start()
}
export const server = http.createServer(start())
export const httpTerminator = createHttpTerminator({
  server,
})
