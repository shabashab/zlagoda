import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { z } from 'zod'
import { findStatsForUpc } from '../../../services/products/repository'

const ParamsSchema = z.object({
  upc: z.string()
})

type Params = z.infer<typeof ParamsSchema>

const QuerySchema = z.object({
  from: z.string().regex(/^[0-9]+$/),
  to: z.string().regex(/^[0-9]+$/)
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/:upc/stats',
  method: 'GET',
  preHandler: [requireAuth('manager')],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { from, to } = req.query as Query
    const { upc } = req.params as Params

    return await findStatsForUpc({
      upc,
      from: new Date(parseInt(from)),
      to: new Date(parseInt(to))
    })
  }
}
