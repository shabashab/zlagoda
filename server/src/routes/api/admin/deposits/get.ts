import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAdmin } from '../../../../hooks/require-admin.pre-handler'
import { requireAuth } from '../../../../hooks/require-auth.pre-handler'
import { getAllBankDepositPurchases } from '../../../../services/purchase'

const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  pageSize: z.string().regex(/^\d+$/).optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const query = req.query as Query

    const page = query.page ? +query.page : 0
    const pageSize = query.pageSize ? +query.pageSize : 0

    return await getAllBankDepositPurchases({ page, pageSize })
  }
}
