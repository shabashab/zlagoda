import { RouteOptions } from 'fastify'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { findFullUserById } from '@services/users/repository'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth],
  handler: async (request) => {
    const user = getRequestUserOrThrow(request)
    return await findFullUserById(user.employeeId)
  }
}
