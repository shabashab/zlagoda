import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { findCustomerById } from '../../../services/customers/repository'

const ParamsSchema = z
  .object({
    id: z.string()
  })
  .strict()

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

    return await findCustomerById(id)
  }
}
