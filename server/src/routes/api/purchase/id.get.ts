import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { z } from 'zod'
import {
  getFullPurchaseById,
  getFullUserBoxPurchases
} from '../../../services/purchase'
import { ForbiddenException } from '../../../exceptions/forbidden.exception'
import { PurchaseStatus } from '@prisma/client'

const ParamsSchema = z.object({
  id: z.string().uuid()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'GET',
  preHandler: [requireAuth],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const { id: purchaseId } = req.params as Params

    const purchase = await getFullPurchaseById(purchaseId)

    if (!user.isAdmin && purchase.userId !== user.id) {
      throw new ForbiddenException()
    }

    if (purchase.status === PurchaseStatus.confirmed) {
      purchase.boxPurchases = await getFullUserBoxPurchases(user, {
        purchaseId: purchase.id
      })
    }

    return purchase
  }
}
