import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { restorePassword } from '@services/auth/password-restore'

const BodySchema = z
  .object({
    newPassword: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

const ParamsSchema = z
  .object({
    id: z.string()
  })
  .strict()

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/:id/confirm',
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    const { newPassword } = req.body as Body

    await restorePassword(id, newPassword)

    return {
      message: 'Password has been changed successfully'
    }
  }
}
