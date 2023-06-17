import { RouteOptions } from 'fastify'

import { verifyPassword } from '@services/auth/crypto'
import { signForUser } from '@services/auth/jwt'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { z } from 'zod'
import { findUserByLogin } from '../../../services/users/repository'
import { rethrowExceptionAsync } from '../../../helpers/rethrow-exception'

const BodySchema = z
  .object({
    login: z.string().email(),
    password: z.string().min(8),
    as: z.union([z.literal('manager'), z.literal('cashier')])
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

    const login = body.login
    const user = await rethrowExceptionAsync(
      async () => await findUserByLogin(login),
      new UnauthorizedException()
    )

    const verificationResult = await verifyPassword(
      body.password,
      user.passwordHash
    )

    if (!verificationResult) {
      throw new UnauthorizedException()
    }

    // if (body.admin && !user.isAdmin) {
    //   throw new UnauthorizedException()
    // }

    const jwt = signForUser(user)

    return {
      token: jwt
    }
  }
}
