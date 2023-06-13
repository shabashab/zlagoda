import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { z } from 'zod'
import { acceptWithdrawalById } from '@services/transaction'

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

    return await acceptWithdrawalById(params.id)
  }
}
