import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { deleteCategoryQuery } from '../../../queries/delete-category.query'

const ParamsSchema = z.object({
  id: z.string().regex(/^[0-9]+$/)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'DELETE',
  url: '/:id',
  preHandler: [requireAuth('manager')],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id: idRaw } = req.params as Params
    const id = parseInt(idRaw)

    return await deleteCategoryQuery.execute(id)
  }
}
