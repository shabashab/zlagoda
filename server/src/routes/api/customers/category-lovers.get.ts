import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { findCategoryLoversQuery } from '../../../queries/find-category-lovers.query'

const QuerySchema = z.object({
  categoryId: z.string().regex(/^[0-9]+$/)
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/category-lovers',
  method: 'GET',
  preHandler: [requireAuth('manager')],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const { categoryId } = req.query as Query
    return await findCategoryLoversQuery.execute(parseInt(categoryId))
  }
}
