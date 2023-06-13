import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { createPasswordRestore } from '@services/auth/password-restore'

const BodySchema = z
  .object({
    email: z.string().email(),
    callbackUrl: z.string().url()
  })
  .strict()

type RestorePasswordCreateDto = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const { email, callbackUrl } = req.body as RestorePasswordCreateDto

    await createPasswordRestore(email, callbackUrl)

    return {
      message: 'Password restore request has been created successfully'
    }
  }
}
