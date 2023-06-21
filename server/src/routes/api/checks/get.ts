import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { findAllChecks } from '../../../services/checks/repository'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (req) => {
    return await findAllChecks()
  }
}
