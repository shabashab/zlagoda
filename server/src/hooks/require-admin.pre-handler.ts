import { preHandlerAsyncHookHandler } from 'fastify'

import { ForbiddenException } from '@exceptions/forbidden.exception'
import { getRequestUserOrThrow } from '@helpers/getRequestUserOrThrow'

export const requireAdmin: preHandlerAsyncHookHandler = async (request) => {
  const user = getRequestUserOrThrow(request)

  if (!user.isAdmin) {
    throw new ForbiddenException()
  }
}
