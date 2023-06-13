import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { z } from 'zod'
import { getAllUsers } from '../../../../services/user/repository'

const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  pageSize: z.string().regex(/^\d+$/).optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const query = req.query as Query

    const page = query.page ? +query.page : 0
    const pageSize = query.pageSize ? +query.pageSize : 0

    return await getAllUsers({
      page,
      pageSize
    })
  }
}
