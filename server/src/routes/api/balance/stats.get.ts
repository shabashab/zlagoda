import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '../../../helpers/getRequestUserOrThrow'
import { getBalanceStatsForUser } from '../../../services/balance'

export const options: RouteOptions = {
  method: 'GET',
  url: '/stats',
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)

    return await getBalanceStatsForUser(user)
  }
}
