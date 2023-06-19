import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config'
import { findAuthUserById } from '../users/repository'
import { AuthUser, User } from '../../models/user.model'

export interface JwtPayload {
  sub: string
}

export class JwtError extends Error {
  constructor () {
    super('An error occurred when processing JWT')
  }
}

const createJwtPayload = (user: User): JwtPayload => {
  return {
    sub: user.employeeId
  }
}

export const signForUser = (user: User, options?: jwt.SignOptions): string => {
  const payload = createJwtPayload(user)
  return jwt.sign(payload, JWT_SECRET)
}

const extractPayload = (token: string): JwtPayload => {
  try {
    const result = jwt.verify(token, JWT_SECRET)

    if (typeof result === 'string' || !result.sub) {
      throw new JwtError()
    }

    return {
      sub: result.sub
    }
  } catch (e) {
    throw new JwtError()
  }
}

export const verifyAndResolveAuthUser = async (
  token: string
): Promise<AuthUser> => {
  const payload = extractPayload(token)

  return await findAuthUserById(payload.sub)
}
