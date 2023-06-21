import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { z } from 'zod'
import { findChecksWithPriceExcludingQuery } from '../../../queries/find-checks-with-price-excluding.query'

const QuerySchema = z.object({
  priceMin: z.string().regex(/^[0-9]+$/),
  exclude: z.string()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/find',
  preHandler: [requireAuth('manager')],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const { exclude, priceMin } = req.query as Query
    return await findChecksWithPriceExcludingQuery.execute({
      exclude,
      priceMin: parseInt(priceMin)
    })
  }
}
