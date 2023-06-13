import { RouteOptions } from 'fastify'
import { z } from 'zod'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { createPurchaseForUser } from '@services/purchase'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'

const BodySchema = z.record(z.string().uuid(), z.number().nonnegative())

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const body = req.body as Body

    return await createPurchaseForUser(user, body)
  }
}
