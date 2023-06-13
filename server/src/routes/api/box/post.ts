import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { createBox } from '@services/box'
import { BoxType } from '@prisma/client'
import { requireAdmin } from '@hooks/require-admin.pre-handler'
import { z } from 'zod'

const BodySchema = z
  .object({
    name: z.string(),
    duration: z.number().int(),
    percentage: z.number(),
    payoutsCount: z.number().positive().int(),
    type: z.union([z.literal(BoxType.START), z.literal(BoxType.PROFI)]),
    maxCount: z.number().int().positive().optional()
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  preHandler: [requireAuth, requireAdmin],
  schema: {
    body: BodySchema
  },
  handler: async (req) => {
    const body = req.body as Body

    return await createBox(body)
  }
}
