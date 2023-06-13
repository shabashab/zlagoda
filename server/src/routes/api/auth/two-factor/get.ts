import { RouteOptions } from 'fastify'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import {
  getTwoFactorForUser,
  getTwoFactorKeyUri
} from '@services/auth/two-factor'
import { z } from 'zod'

const QuerySchema = z
  .object({
    enabled: z.string().optional()
  })
  .strict()

type QueryDto = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/',
  preHandler: [requireAuth],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const { enabled } = req.query as QueryDto
    const user = getRequestUserOrThrow(req)

    const twoFactor = await getTwoFactorForUser(user, !!enabled)

    if (!twoFactor) {
      return false
    }

    const keyUri = await getTwoFactorKeyUri(user, twoFactor)

    return {
      ...twoFactor,
      keyUri
    }
  }
}
