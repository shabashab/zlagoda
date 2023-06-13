import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { verifyPasswordRestoreToken } from '../../../../services/auth/password-restore'

const ParamsSchema = z
  .object({
    id: z.string()
  })
  .strict()

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/:id/verify',
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    return await verifyPasswordRestoreToken(id)
  }
}
