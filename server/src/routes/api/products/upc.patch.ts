import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { updateProduct } from '@services/products/repository'
import { z } from 'zod'

const BodySchema = z
  .object({
    categoryId: z.number(),
    number: z.number(),
    price: z.number(),
    isPromo: z.boolean().optional(),
    name: z.string(),
    characteristics: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

const ParamsSchema = z.object({
  upc: z.string()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:upc',
  method: 'PATCH',
  preHandler: [requireAuth('manager')],
  schema: {
    body: BodySchema,
    params: ParamsSchema
  },
  handler: async (req) => {
    const { upc } = req.params as Params
    const body = req.body as Body

    return await updateProduct(upc, body)
  }
}
