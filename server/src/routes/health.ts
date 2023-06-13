import { RouteOptions } from 'fastify'

export const options: RouteOptions = {
  url: '/health',
  method: 'GET',
  handler: async () => {
    return { status: 'The service is alive' }
  }
}
