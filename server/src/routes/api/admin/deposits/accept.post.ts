import { RouteOptions } from 'fastify'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import {
  confirmPurchasePayment,
  getPurchaseById
} from '../../../../services/purchase'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id/accept',
  method: 'POST',
  schema: {
    params: ParamsSchema
  },
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    const params = req.params as Params

    const purchase = await getPurchaseById(params.id)

    await confirmPurchasePayment(purchase)

    return {
      message: 'Purchase has been successfully confirmed'
    }
  }
}
