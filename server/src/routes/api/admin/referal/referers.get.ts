import { RouteOptions } from 'fastify'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { getAllReferers } from '@services/referal'

export const options: RouteOptions = {
  url: '/referers',
  method: 'GET',
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    return await getAllReferers()
  }
}
