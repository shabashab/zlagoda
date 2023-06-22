import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { productsMinMaxQuery } from '../../../queries/products-min-max.query'

const QuerySchema = z.object({
  categoryId: z.string().regex(/^[0-9]+$/),
  min: z.string().regex(/^[0-9]+$/),
  max: z.string().regex(/^[0-9]+$/)
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/min-max',
  method: 'GET',
  schema: {
    querystring: QuerySchema
  },
  handler: async (req) => {
    const { min, max, categoryId } = req.query as Query

    return await productsMinMaxQuery.execute({
      min: parseInt(min),
      max: parseInt(max),
      categoryId: parseInt(categoryId)
    })
  }
}
