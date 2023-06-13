import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { cancelPurchase, getPurchaseById } from '@services/purchase'
import { NotFoundException } from '@exceptions/not-found.exception'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id/cancel',
  method: 'POST',
  schema: {
    params: ParamsSchema
  },
  preHandler: [requireAuth],
  handler: async (req) => {
    const { id: purchaseId } = req.params as Params

    const purchase = await getPurchaseById(purchaseId)

    if (!purchase) {
      throw new NotFoundException()
    }

    return await cancelPurchase(purchase)
  }
}
