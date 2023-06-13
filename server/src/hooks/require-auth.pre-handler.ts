import { preHandlerAsyncHookHandler } from 'fastify'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { UserNotVerifiedException } from '@exceptions/user-not-verified.exception'
import { verifyAndResolveUser } from '@services/auth/jwt'

const extractJwtFromHeader = (authorizationHeader: string) =>
  authorizationHeader.substring('Bearer '.length)

export const requireAuth: preHandlerAsyncHookHandler = async (request) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthorizedException()
  }

  const jwt = extractJwtFromHeader(authHeader)
  const user = await verifyAndResolveUser(jwt)

  if (!user) {
    throw new UnauthorizedException()
  }

  if (!user.isVerified) {
    throw new UserNotVerifiedException()
  }

  request.user = user
}
