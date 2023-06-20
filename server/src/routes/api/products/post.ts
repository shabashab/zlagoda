import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { createProduct } from '@services/products/repository'

const BodySchema = z
  .object({
    upc: z.string().min(12).max(13),
    categoryId: z.number(),
    number: z.number(),
    price: z.number(),
    isPromo: z.boolean().optional(),
    name: z.string(),
    characteristics: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth('manager')],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const body = req.body as Body
    return await createProduct(body)
  }
}
