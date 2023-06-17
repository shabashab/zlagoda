import { FastifyRequest } from 'fastify'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { AuthUser } from '../models/user.model'

export const getRequestUserOrThrow = (request: FastifyRequest): AuthUser => {
  if (!request.user) {
    throw new UnauthorizedException()
  }

  return request.user
}
