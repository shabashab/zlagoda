import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { updateCategoryById } from '../../../services/categories/repository'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'

const BodySchema = z.object({
  name: z.string()
})

type Body = z.infer<typeof BodySchema>

const ParamsSchema = z.object({
  id: z.string().regex(/^[0-9]+$/)
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'PATCH',
  preHandler: [requireAuth('manager')],
  schema: {
    body: BodySchema,
    params: ParamsSchema
  },
  handler: async (req) => {
    const body = req.body as Body
    const { id } = req.params as Params
    return await updateCategoryById(parseInt(id), body)
  }
}
