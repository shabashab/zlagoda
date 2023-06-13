import { RouteOptions } from 'fastify'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import {
  getUserHasTwoFactor,
  removeTwoFactorForUser,
  validateOtpToken
} from '@services/auth/two-factor'
import { z } from 'zod'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'

const BodySchema = z.object({
  otp: z.string()
})

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'DELETE',
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)

    if (await getUserHasTwoFactor(user)) {
      if (!req.body) {
        throw new UnauthorizedException('Invalid OTP')
      }

      const { otp } = req.body as Body

      if (!otp || !(await validateOtpToken(user, otp, true))) {
        throw new UnauthorizedException('Invalid OTP')
      }
    }

    await removeTwoFactorForUser(user)

    return {
      message: 'Two-factor authentication has been disabled successfully'
    }
  }
}
