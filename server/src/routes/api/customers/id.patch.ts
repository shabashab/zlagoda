import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { updateCustomerById } from '@services/customers/repository'

const ParamsSchema = z
  .object({
    id: z.string()
  })
  .strict()

type Params = z.infer<typeof ParamsSchema>

const BodySchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    patronymic: z.string().nullable().optional(),
    phoneNumber: z.string(),
    city: z.string().nullable().optional(),
    street: z.string().nullable().optional(),
    zipCode: z.string().nullable().optional(),
    percent: z.number().min(0).max(100)
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/:id',
  method: 'PATCH',
  preHandler: [requireAuth()],
  schema: {
    params: ParamsSchema,
    body: BodySchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    const body = req.body as Body

    return await updateCustomerById(id, body)
  }
}
