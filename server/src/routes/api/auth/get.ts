import { RouteOptions } from 'fastify'
import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { omit } from 'lodash'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth],
  handler: async (request) => {
    const user = getRequestUserOrThrow(request)

    return omit(
      user,
      'signUpIpAddress',
      'activityLogged',
      'arbitrageBonusBan',
      'isActiveUser',
      'password'
    )
  }
}
