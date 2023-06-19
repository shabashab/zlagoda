import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { createEmployeeDtoRawTransformer } from '../../../transformers/create-employee-dto-raw.transformer'
import { createEmployee } from '../../../services/employees/repository'

const BodySchema = z
  .object({
    employeeId: z.string(),
    surname: z.string(),
    name: z.string(),
    patronymic: z.string().optional(),
    role: z.union([z.literal('cashier'), z.literal('manager')]),
    salary: z.number(),
    birthDate: z.string().datetime(),
    startDate: z.string().datetime(),
    phoneNumber: z.string(),
    city: z.string(),
    street: z.string(),
    zipCode: z.string()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth('manager')],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const body = req.body as Body
    const createEmployeeDto = createEmployeeDtoRawTransformer.transform(body)

    return await createEmployee(createEmployeeDto)
  }
}
