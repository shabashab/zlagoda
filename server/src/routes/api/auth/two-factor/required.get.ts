import { RouteOptions } from 'fastify'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { verifyPassword } from '@services/auth/crypto'
import { getUserHasTwoFactor } from '@services/auth/two-factor'
import { findUserByEmail } from '@services/user/repository'
import { z } from 'zod'

const QuerySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8)
  })
  .strict()

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/required',
  schema: {
    querystring: QuerySchema
  },
  handler: async (request) => {
    const body = request.query as Query
    const user = await findUserByEmail(body.email)

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

    return await getUserHasTwoFactor(user)
  }
}
