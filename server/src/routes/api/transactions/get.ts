import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '../../../helpers/getRequestUserOrThrow'
import { getUserTransactionsPaginated } from '../../../services/transaction/repository'
import { TransactionStatus } from '@prisma/client'

const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  pageSize: z.string().regex(/^\d+$/).optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const query = req.query as Query

    const page = query.page ? +query.page : 0
    const pageSize = query.pageSize ? +query.pageSize : 0

    return await getUserTransactionsPaginated(
      user,
      { page, pageSize },
      {
        status: {
          notIn: [TransactionStatus.planned, TransactionStatus.created]
        }
      }
    )
  }
}
