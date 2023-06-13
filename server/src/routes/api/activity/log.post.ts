import { RouteOptions } from 'fastify'
import { z } from 'zod'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { decodeBase64Number } from '@helpers/numberBase64'
import { UnprocessableEntityException } from '@exceptions/unprocessable-entity.exception'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { markUserActivityLogged } from '@services/user/repository'

const BodySchema = z.object({
  balance: z.string().min(1),
  index: z.string().min(1),
  profile: z.string().min(1)
})

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: 'POST',
  url: '/log',
  schema: {
    body: BodySchema
  },
  preHandler: [requireAuth],
  handler: async (req) => {
    const user = getRequestUserOrThrow(req)
    const body = req.body as Body

    if (
      user.arbitrageBonusBan ||
      user.activityLogged ||
      user.isActivityCheckComplete
    ) {
      return {
        message: 'Successful'
      }
    }

    const now = Date.now()

    const validLength = Object.values(body)
      .map((value) => {
        try {
          return decodeBase64Number(value)
        } catch (e) {
          throw new UnprocessableEntityException('Invalid data')
        }
      })
      .filter((value) => {
        return value <= now && value > user.createdAt.getDate()
      }).length

    if (validLength < Object.values(body).length) {
      throw new UnprocessableEntityException('Validation error')
    }

    await markUserActivityLogged(user)

    return {
      message: 'Successful'
    }
  }
}
