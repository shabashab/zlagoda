import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { z } from 'zod'
import { deleteEmployeeById } from '../../../services/employees/repository'

export const ParamsSchema = z.object({
  id: z.string()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'DELETE',
  preHandler: [requireAuth('manager')],
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    return await deleteEmployeeById(id)
  }
}
