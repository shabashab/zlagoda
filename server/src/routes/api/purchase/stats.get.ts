import { RouteOptions } from 'fastify'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { getUserPurchaseStats } from '@services/purchase'

export const options: RouteOptions = {
  url: '/stats',
  method: 'GET',
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    return await getUserPurchaseStats(user)
  }
}
