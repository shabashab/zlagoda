import { User } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'

export const getRequestUserOrThrow = (request: FastifyRequest): User => {
  if (!request.user) {
    throw new UnauthorizedException()
  }
  return request.user
}
