import {
  resolveIdByUserOrId,
  resolveUserByUserOrId,
  UserOrId
} from '@helpers/userOrId'
import { TwoFactor } from '@prisma/client'
import { NotFoundException } from '@exceptions/not-found.exception'

import { randomBytes } from 'crypto'
import { authenticator } from 'otplib'

const generateTokens = () => {
  return Array(16)
    .fill(null)
    .map(() => randomBytes(6).toString('hex'))
}

export const getTwoFactorForUser = async (
  user: UserOrId,
  enabled?: boolean
): Promise<TwoFactor | null> => {
  const userId = resolveIdByUserOrId(user)

  return await globalThis.prisma.twoFactor.findFirst({
    where: {
      userId,
      enabled
    }
  })
}

export const createTwoFactorForUser = async (
  user: UserOrId
): Promise<TwoFactor> => {
  const userId = resolveIdByUserOrId(user)
  const userTwoFactor = await getTwoFactorForUser(user)

  if (userTwoFactor) {
    return userTwoFactor
  }

  const secret = authenticator.generateSecret(128)
  const tokens = generateTokens()

  return await globalThis.prisma.twoFactor.create({
    data: {
      enabled: false,
      secret,
      tokens,
      userId
    }
  })
}

export const enableTwoFactorForUser = async (user: UserOrId): Promise<void> => {
  const userId = resolveIdByUserOrId(user)

  await globalThis.prisma.twoFactor.update({
    where: {
      userId
    },
    data: {
      enabled: true
    }
  })
}

export const getUserHasTwoFactor = async (user: UserOrId): Promise<boolean> => {
  const userId = resolveIdByUserOrId(user)
  const twoFactorCount = await globalThis.prisma.twoFactor.count({
    where: {
      userId,
      enabled: true
    }
  })
  return twoFactorCount > 0
}

export const removeTwoFactorForUser = async (user: UserOrId): Promise<void> => {
  const userId = resolveIdByUserOrId(user)

  await globalThis.prisma.twoFactor.delete({
    where: {
      userId
    }
  })
}

export const validateOtpToken = async (
  user: UserOrId,
  token: string,
  enabled: boolean = true
) => {
  const userTwoFactor = await getTwoFactorForUser(user, enabled)

  if (!userTwoFactor) throw new NotFoundException()

  const isValid =
    authenticator.verify({
      token,
      secret: userTwoFactor.secret
    }) || (userTwoFactor.tokens as string[]).includes(token)

  return isValid
}

export const getTwoFactorKeyUri = async (
  user: UserOrId,
  twoFactor?: TwoFactor | null
): Promise<string> => {
  user = await resolveUserByUserOrId(user)
  twoFactor ||= await getTwoFactorForUser(user)

  if (!twoFactor) throw new NotFoundException()

  const uri = authenticator.keyuri(user.email, 'Gamblix', twoFactor.secret)

  return uri
}
