import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config'
import { getUserWithProfile } from '../user/repository'

export interface JwtPayload {
  sub: number
}

export class JwtError extends Error {
  constructor () {
    super('An error occurred when processing JWT')
  }
}

const createJwtPayload = (user: User): JwtPayload => {
  return {
    sub: user.id
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
      sub: +result.sub
    }
  } catch (e) {
    throw new JwtError()
  }
}

export const verifyAndResolveUser = async (
  token: string
): Promise<User | null> => {
  const payload = extractPayload(token)

  return await getUserWithProfile(payload.sub)
}
