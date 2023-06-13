import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { z } from 'zod'
import { getRequestUserOrThrow } from '../../../helpers/getRequestUserOrThrow'
import { createWithdrawal } from '../../../services/transaction'

const BodySchema = z
  .object({
    amount: z.number().nonnegative().min(200),
    wallet: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  schema: {
    body: BodySchema
  },
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const body = req.body as Body

    await createWithdrawal(user, body.amount, body.wallet)
  }
}
