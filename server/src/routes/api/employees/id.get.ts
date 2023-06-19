import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { findEmployeeById } from '../../../services/employees/repository'

export const ParamsSchema = z.object({
  id: z.string()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/:id',
  schema: {
    params: ParamsSchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    return await findEmployeeById(id)
  }
}
