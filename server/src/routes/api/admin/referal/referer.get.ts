import { RouteOptions } from 'fastify'
import { z } from 'zod'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { getFullRefererInfo } from '@services/referal'

const ParamsSchema = z.object({
  id: z.string().regex(/^\d+$/)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/referers/:id',
  method: 'GET',
  schema: {
    params: ParamsSchema
  },
  preHandler: [requireAuth, requireAdmin],
  handler: async (req) => {
    const { id: idRaw } = req.params as Params

    const id = +idRaw

    return await getFullRefererInfo(id)
  }
}
