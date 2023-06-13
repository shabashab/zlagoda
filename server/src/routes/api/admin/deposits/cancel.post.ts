import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { cancelPurchase, getPurchaseById } from '@services/purchase'
import { z } from 'zod'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/:id/cancel',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    const purchase = await getPurchaseById(id)

    await cancelPurchase(purchase)

    return {
      message: 'Purchase has been successfully canceled'
    }
  }
}
