import { RouteOptions } from 'fastify'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { getPurchasesWithSumForUser } from '@services/purchase'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)

    return getPurchasesWithSumForUser(user)
  }
}
