import { RouteOptions } from 'fastify'

import { requireAuth } from '@hooks/require-auth.pre-handler'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'
import { findFullEmployeeById } from '../../../services/employees/repository'

export const options: RouteOptions = {
  url: '/',
  method: 'GET',
  preHandler: [requireAuth()],
  handler: async (request) => {
    const user = getRequestUserOrThrow(request)
    return await findFullEmployeeById(user.employeeId)
  }
}
