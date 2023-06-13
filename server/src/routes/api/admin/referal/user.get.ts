import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { getUserFullInfoById } from '../../../../services/user/repository'
import { PurchaseStatus } from '@prisma/client'

const ParamsSchema = z.object({
  id: z.string().regex(/^\d+$/)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/users/:id',
  method: 'GET',
  schema: {
    params: ParamsSchema
  },
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    const { id: idRaw } = req.params as Params

    const id = +idRaw

    return await getUserFullInfoById(id, {
      purchasesWhere: {
        status: {
          in: [PurchaseStatus.confirmed, PurchaseStatus.paid]
        }
      }
    })
  }
}
