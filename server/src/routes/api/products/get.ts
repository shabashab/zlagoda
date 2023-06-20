import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { findAllFullProducts } from '@services/products/repository'
import { z } from 'zod'

const QuerySchema = z.object({
  categoryId: z
    .string()
    .regex(/^[0-9]+$/)
    .optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const { categoryId } = (req.query ?? {}) as Query

    return await findAllFullProducts({
      categoryId: categoryId ? parseInt(categoryId) : undefined
    })
  }
}
