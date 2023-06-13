import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getOrAssignTransactionPurposeForCardPurchase } from '../../../services/payment'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/:id/payment-purpose',
  preHandler: [requireAuth],
  handler: async (req) => {
    const { id } = req.params as Params

    const purchaseData = await getOrAssignTransactionPurposeForCardPurchase(id)

    return {
      purchaseId: id,
      paymentPurpose: `${purchaseData.id1}RE-${purchaseData.id2}`
    }
  }
}
