import { RouteOptions } from 'fastify'
import { z } from 'zod'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { createCustomer } from '@services/customers/repository'

const BodySchema = z
  .object({
    cardNumber: z.string(),
    name: z.string(),
    surname: z.string(),
    patronymic: z.string().optional(),
    phoneNumber: z.string(),
    city: z.string().optional(),
    street: z.string().optional(),
    zipCode: z.string().optional(),
    percent: z.number().min(0).max(100)
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth()],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const body = req.body as Body
    return await createCustomer(body)
  }
}
