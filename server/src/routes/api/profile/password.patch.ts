import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { updateUserPassword } from '../../../services/user/repository'
import { getRequestUserOrThrow } from '../../../helpers/getRequestUserOrThrow'

const BodySchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().nonempty().min(8)
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/password',
  method: 'PATCH',
  schema: {
    body: BodySchema
  },
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const { newPassword, oldPassword } = req.body as Body

    await updateUserPassword(user, oldPassword, newPassword)

    return {
      message: 'Password has been successfully updated'
    }
  }
}
