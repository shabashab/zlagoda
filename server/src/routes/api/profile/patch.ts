import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { z } from 'zod'
import { updateOrCreateUserProfile } from '@services/user/repository'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'

const BodySchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    phoneNumber: z.string().nonempty(),
    gender: z
      .union([z.literal('Male'), z.literal('Female'), z.literal('Other')])
      .optional(),
    address: z
      .object({
        country: z
          .object({
            name: z.string().nonempty(),
            code: z.string().nonempty()
          })
          .strict(),
        city: z.string().nonempty(),
        street: z.string().nonempty(),
        zip: z.string().nonempty()
      })
      .strict()
      .optional()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: 'PATCH',
  url: '/',
  preHandler: [requireAuth],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const body = req.body as Body

    return await updateOrCreateUserProfile(user, body)
  }
}
