import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { cancelPaymentForPurchaseById } from '../../../services/payment'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/:id/pay/cancel',
  preHandler: [requireAuth],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params

    return await cancelPaymentForPurchaseById(id)
  }
}
