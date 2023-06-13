import { RouteOptions } from 'fastify'

import { findUserByEmail } from '@services/user/repository'
import { verifyPassword } from '@services/auth/crypto'
import { signForUser } from '@services/auth/jwt'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { UserNotVerifiedException } from '@exceptions/user-not-verified.exception'
import {
  getUserHasTwoFactor,
  validateOtpToken
} from '../../../services/auth/two-factor'
import { z } from 'zod'

const BodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    otp: z.string().optional(),
    admin: z.boolean().optional()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/sign-in',
  schema: {
    body: BodySchema
  },
  handler: async (request) => {
    const body = request.body as Body

    const email = body.email.toLowerCase()
    const user = await findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }

    const verificationResult = await verifyPassword(
      body.password,
      user.password
    )

    if (!verificationResult) {
      throw new UnauthorizedException()
    }

    if (!user.isVerified) {
      throw new UserNotVerifiedException()
    }

    if (await getUserHasTwoFactor(user)) {
      if (!body.otp || !(await validateOtpToken(user, body.otp, true))) {
        throw new UnauthorizedException()
      }
    }

    if (body.admin && !user.isAdmin) {
      throw new UnauthorizedException()
    }

    const jwt = signForUser(user)

    return {
      token: jwt
    }
  }
}
