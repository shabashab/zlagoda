import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { getUserFullInfoById } from '@services/user/repository'

const ParamsSchema = z.object({
  id: z.string().regex(/^\d+$/)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'GET',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const params = req.params as Params
    const id = +params.id

    return await getUserFullInfoById(id, {})
  }
}
