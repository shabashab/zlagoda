import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getAllBoxes } from '../../../services/box'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth],
  handler: async (req) => {
    // const user = getRequestUserOrThrow(req)
    return await getAllBoxes()
  }
}
