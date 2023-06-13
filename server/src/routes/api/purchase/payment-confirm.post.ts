import { RouteOptions } from 'fastify'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { confirmPurchasePayment, getPurchaseById } from '@services/purchase'
import { NotFoundException } from '@exceptions/not-found.exception'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id/payment/confirm',
  method: 'POST',
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    const { id: paymentId } = req.params as Params

    const payment = await getPurchaseById(paymentId)

    if (!payment) {
      throw new NotFoundException()
    }

    return await confirmPurchasePayment(payment)
  }
}
