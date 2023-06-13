import { RouteOptions } from 'fastify'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import {
  enableTwoFactorForUser,
  validateOtpToken
} from '@services/auth/two-factor'
import { z } from 'zod'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'

const BodySchema = z
  .object({
    otp: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: 'PATCH',
  url: '/enable',
  preHandler: [requireAuth],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)

    const { otp } = req.body as Body

    if (!(await validateOtpToken(user, otp, false))) {
      throw new UnauthorizedException('Invalid OTP')
    }

    await enableTwoFactorForUser(user)

    return {
      message: 'Two factor authentication has been enabled successfully'
    }
  }
}
