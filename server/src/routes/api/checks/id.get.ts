import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { findFullCheckById } from '../../../services/checks/repository'
import { z } from 'zod'

const ParamsSchema = z.object({
  id: z.string().max(10)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'GET',
  preHandler: [requireAuth()],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params

    return await findFullCheckById(id)
  }
}
