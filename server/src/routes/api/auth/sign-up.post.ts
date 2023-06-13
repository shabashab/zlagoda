import { RouteOptions } from 'fastify'
import { signUp } from '@services/auth/sign-up'
import { z } from 'zod'
import { getRequestClientIp } from '../../../helpers/getRequestClientIp'

const BodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    callbackUrl: z.string().url(),
    referalId: z.number().optional()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/sign-up',
  schema: {
    body: BodySchema
  },
  handler: async (request) => {
    const body = request.body as Body
    const requestIp = getRequestClientIp(request)

    await signUp(body, requestIp)

    return {
      message: 'Signed up successfully'
    }
  }
}
