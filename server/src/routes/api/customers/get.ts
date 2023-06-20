import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { findAllCustomers } from '@services/customers/repository'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (req) => {
    return await findAllCustomers()
  }
}
