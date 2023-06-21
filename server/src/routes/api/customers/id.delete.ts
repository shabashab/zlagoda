import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { deleteCustomerCardQuery } from '../../../queries/delete-customer-card.query'

const ParamsSchema = z
  .object({
    id: z.string()
  })
  .strict()

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'DELETE',
  schema: {
    params: ParamsSchema
  },
  preHandler: [requireAuth()],
  handler: async (req) => {
    const { id } = req.params as Params

    return await deleteCustomerCardQuery.execute(id)
  }
}
