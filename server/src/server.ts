import Fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

import { PORT } from './config'
import { routesPlugin } from './routes'

// import * as bullBoardPluginModule from './routes/bull-board'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var logger: FastifyBaseLogger

  // eslint-disable-next-line no-var, no-unused-vars
  var fastify: FastifyInstance
}

export const init = async () => {
  globalThis.fastify = Fastify({
    logger: true
  })

  globalThis.logger = globalThis.fastify.log

  globalThis.logger.info('[server]: server has been initialized successfully')
}

export const startServer = async () => {
  const fastify = globalThis.fastify

  fastify.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })

  fastify.register(routesPlugin)

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    globalThis.logger = fastify.log
    // await initializeBaseUrl()
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}
