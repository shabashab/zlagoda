import { NotFoundException } from '@exceptions/not-found.exception'
import {
  findUserByEmail,
  updateUserPasswordUnchecked
} from '@services/user/repository'
import { sendEmail } from '@services/email'
import { PasswordRestoreStatus } from '@prisma/client'
import { BadRequestException } from '@exceptions/bad-request.exception'

const EXPIRES_IN = 60 * 60 * 24 * 1000

export const createPasswordRestore = async (
  email: string,
  callbackUrl: string
) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new NotFoundException()
  }

  const validUntil = new Date(Date.now() + EXPIRES_IN)

  const passwordRestore = await globalThis.prisma.passwordRestore.create({
    data: {
      validUntil,
      userId: user.id
    }
  })

  const url = new URL(callbackUrl)
  url.searchParams.set('token', passwordRestore.id)

  await sendEmail(
    user.email,
    'Password restore request at monfi.io',
    `Follow link to restore password: ${url.toString()}\n<br>\n<i>Note: Link expires in a week</i>`
  )
}

export const verifyPasswordRestoreToken = async (token: string) => {
  const passwordRestoreCount = await globalThis.prisma.passwordRestore.count({
    where: {
      id: token,
      status: PasswordRestoreStatus.requested,
      validUntil: {
        gte: new Date(Date.now())
      }
    }
  })

  return passwordRestoreCount > 0
}

export const restorePassword = async (token: string, newPassword: string) => {
  const passwordRestore = await globalThis.prisma.passwordRestore.findFirst({
    where: {
      id: token,
      status: PasswordRestoreStatus.requested,
      validUntil: {
        gte: new Date(Date.now())
      }
    },
    include: {
      user: true
    }
  })

  if (!passwordRestore) throw new BadRequestException()

  const user = passwordRestore.user

  await updateUserPasswordUnchecked(user, newPassword)

  await globalThis.prisma.passwordRestore.update({
    where: {
      id: token
    },
    data: {
      status: PasswordRestoreStatus.restored
    }
  })
}
