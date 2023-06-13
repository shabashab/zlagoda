import { RouteOptions } from 'fastify'
import { getRequestUserOrThrow } from '../../../../helpers/getRequestUserOrThrow'
import { requireAuth } from '../../../../hooks/require-auth.pre-handler'
import { createTwoFactorForUser } from '../../../../services/auth/two-factor'

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const twoFactor = await createTwoFactorForUser(user)

    return twoFactor
  }
}
