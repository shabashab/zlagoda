import { preHandlerAsyncHookHandler } from 'fastify'
import { UnauthorizedException } from '@exceptions/unauthorized.exception'
import { verifyAndResolveAuthUser } from '@services/auth/jwt'

const extractJwtFromHeader = (authorizationHeader: string) =>
  authorizationHeader.substring('Bearer '.length)

export const requireAuth =
  (role?: 'cashier' | 'manager'): preHandlerAsyncHookHandler =>
    async (request) => {
      const authHeader = request.headers.authorization

      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedException()
      }

      const jwt = extractJwtFromHeader(authHeader)

      try {
        const user = await verifyAndResolveAuthUser(jwt)

        if (role && user.role !== role) {
          throw new UnauthorizedException()
        }

        request.user = user
      } catch (e) {
        throw new UnauthorizedException()
      }
    }
