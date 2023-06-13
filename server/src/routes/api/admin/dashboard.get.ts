import { RouteOptions } from 'fastify'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getAdminPurchaseStats } from '@services/purchase'
import { getVerifiedUsersCount } from '../../../services/user/stats'

export const options: RouteOptions = {
  method: 'GET',
  url: '/dashboard',
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    const purchaseStats = await getAdminPurchaseStats()
    const usersCount = await getVerifiedUsersCount()

    return {
      ...purchaseStats,
      usersCount
    }
  }
}
