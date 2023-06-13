import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { verifyUser } from '@services/auth/verification'

const VerifyBodySchema = z
  .object({
    token: z.string()
  })
  .strict()

type VerifyDto = z.infer<typeof VerifyBodySchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/verify',
  schema: {
    body: VerifyBodySchema
  },
  handler: async (request) => {
    const body = request.body as VerifyDto
    await verifyUser(body.token)
    return {
      message: 'User verified successfully'
    }
  }
}
