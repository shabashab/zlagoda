import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '../../../../hooks/require-auth.pre-handler'
import { createUser } from '../../../../services/users/repository'

const BodySchema = z.object({
  login: z.string(),
  password: z.string()
})

type Body = z.infer<typeof BodySchema>

const ParamsSchema = z.object({
  id: z.string()
})

type Params = z.infer<typeof ParamsSchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  schema: {
    body: BodySchema,
    params: ParamsSchema
  },
  preHandler: [requireAuth('manager')],
  handler: async (req) => {
    const { id } = req.params as Params
    const body = req.body as Body

    return await createUser({
      employeeId: id,
      login: body.login,
      password: body.password
    })
  }
}
