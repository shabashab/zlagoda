import { RouteOptions } from 'fastify'
import { requireAuth } from '../../../hooks/require-auth.pre-handler'
import { findAllChecks } from '../../../services/checks/repository'
import { z } from 'zod'

const QuerySchema = z.object({
  from: z
    .string()
    .regex(/^[0-9]+$/)
    .optional(),
  to: z
    .string()
    .regex(/^[0-9]+$/)
    .optional(),
  employeeId: z
    .string()
    .regex(/^[0-9]+$/)
    .optional()
})

type Query = z.infer<typeof QuerySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (req) => {
    const query = req.query as Query

    return await findAllChecks({
      from: query.from ? new Date(parseInt(query.from)) : undefined,
      to: query.to ? new Date(parseInt(query.to)) : undefined,
      employeeId: query.employeeId
    })
  }
}
