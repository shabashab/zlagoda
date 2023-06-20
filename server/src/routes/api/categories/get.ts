import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { findAllCategories } from '../../../services/categories/repository'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (req) => {
    return await findAllCategories()
  }
}
