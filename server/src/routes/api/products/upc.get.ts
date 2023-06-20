import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { findFullProductByUpc } from '@services/products/repository'

const ParamsSchema = z.object({
  upc: z.string()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:upc',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (req) => {
    const { upc } = req.params as Params
    return await findFullProductByUpc(upc)
  }
}
