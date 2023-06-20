import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { createCategory } from '../../../services/categories/repository'

const BodySchema = z
  .object({
    name: z.string().max(50)
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth('manager')],
  handler: async (req) => {
    const body = req.body as Body
    return await createCategory(body)
  }
}
