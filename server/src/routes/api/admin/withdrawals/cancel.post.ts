import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { cancelTransactionById } from '@services/transaction'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id/cancel',
  method: 'POST',
  handler: async (req) => {
    const params = req.params as Params

    return await cancelTransactionById(params.id)
  }
}
