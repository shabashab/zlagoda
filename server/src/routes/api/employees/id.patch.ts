import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { updateEmployeeById } from '@services/employees/repository'
import { updateEmployeeDtoRawTransformer } from '../../../transformers/update-employee-dto-raw.transformer'

export const ParamsSchema = z.object({
  id: z.string()
})

type Params = z.infer<typeof ParamsSchema>

const BodySchema = z
  .object({
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
  url: '/:id',
  method: 'PATCH',
  preHandler: [requireAuth('manager')],
  schema: {
    params: ParamsSchema,
    body: BodySchema
  },
  handler: async (req) => {
    const { id } = req.params as Params
    const updateDtoRaw = req.body as Body
    const updateDto = updateEmployeeDtoRawTransformer.transform(updateDtoRaw)

    return await updateEmployeeById(id, updateDto)
  }
}
