import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { createCheck } from '../../../services/checks/repository'
import { getRequestUserOrThrow } from '../../../helpers/getRequestUserOrThrow'

const BodySchema = z.object({
  customerId: z.string().optional(),
  entries: z
    .array(
      z.object({
        upc: z.string().min(12).max(13),
        number: z.number().int().min(1)
      })
    )
    .min(1)
})

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth('cashier')],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const body = req.body as Body
    return await createCheck(body, user.employeeId)
  }
}
