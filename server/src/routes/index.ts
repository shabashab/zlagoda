import { ZodError, ZodSchema } from 'zod'
import { HttpException } from '../exceptions/http-exception'
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception'
import { createPluginFromConfiguration } from '../helpers/createPluginFromConfiguration'

export const routesPlugin = createPluginFromConfiguration({
  plugins: [import('./api')],
  routes: [import('./health')],
  extend: async (fastify) => {
    fastify.setValidatorCompiler(({ schema }) => {
      return (data) => {
        try {
          return (schema as ZodSchema).parse(data)
        } catch (e) {
          if (e instanceof ZodError) {
            throw new UnprocessableEntityException(e.errors)
          }

          throw e
        }
      }
    })

    fastify.setErrorHandler<HttpException>(async (error, request, reply) => {
      if (!('status' in error)) {
        reply.status(500)

        request.server.log.error(error)

        return {
          status: 500,
          message: 'Server e'
        }
      }

      reply.status(error.status)

      return {
        status: error.status,
        message: error.message,
        details: error.details
      }
    })
  }
})
