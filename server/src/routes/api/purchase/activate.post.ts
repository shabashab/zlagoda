import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { activatePurchase, getPurchaseById } from '@services/purchase'
import { NotFoundException } from '@exceptions/not-found.exception'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id/activate',
  method: 'POST',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id: purchaseId } = req.params as Params

    const purchase = await getPurchaseById(purchaseId)

    if (!purchase) {
      throw new NotFoundException()
    }

    return await activatePurchase(purchase)
  }
}
