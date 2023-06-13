import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { z } from 'zod'
import { createPaymentForPurchase } from '../../../services/payment'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

const BodySchema = z.object({
  paymentMethod: z.union([
    z.literal('BTC'),
    z.literal('ETH'),
    z.literal('USDT.TRC20'),
    z.literal('USDT.ERC20'),
    z.literal('CARD'),
    z.literal('LTCT')
  ])
})

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/:id/pay',
  method: 'POST',
  preHandler: [requireAuth],
  schema: {
    params: ParamsSchema,
    body: BodySchema
  },
  handler: async (req) => {
    const { paymentMethod } = req.body as Body
    const { id } = req.params as Params

    return await createPaymentForPurchase(id, paymentMethod)
  }
}
