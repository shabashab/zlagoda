import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { findEmployeesByFilter } from '../../../services/employees/repository'

const QuerySchema = z.object({
  surname: z.string().optional(),
  role: z.union([z.literal('cashier'), z.literal('manager')]).optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  method: 'GET',
  url: '/',
  schema: {
    querystring: QuerySchema
  },
  preHandler: [requireAuth('manager')],
  handler: async (req) => {
    const query = req.query as Query
    return await findEmployeesByFilter(query)
  }
}
