import { Prisma, User } from '@prisma/client'
import { encryptPassword, verifyPassword } from '../auth/crypto'
import {
  UserOrId,
  resolveIdByUserOrId,
  resolveUserByUserOrId
} from '../../helpers/userOrId'
import { NotFoundException } from '../../exceptions/not-found.exception'
import { getFullUserBoxPurchases } from '../purchase'
import { createPaginationMeta } from '../../helpers/createPaginationMeta'
import { ForbiddenException } from '../../exceptions/forbidden.exception'

type UpdateProfileDto = {
  firstName: string
  lastName: string
  phoneNumber: string
  gender?: 'Male' | 'Female' | 'Other'
  address?: {
    country: {
      code: string
      name: string
    }
    city: string
    street: string
    zip: string
  }
}

export const findUserByEmail = (email: string): Promise<User | null> => {
  return globalThis.prisma.user.findFirst({
    where: {
      email
    }
  })
}

export const findUserExistsByEmail = async (
  email: string
): Promise<boolean> => {
  const usersCount = await globalThis.prisma.user.count({
    where: {
      email
    }
  })

  return usersCount > 0
}

export const findUserExistsById = async (id: number): Promise<boolean> => {
  const usersCount = await globalThis.prisma.user.count({
    where: {
      id
    }
  })

  return usersCount > 0
}

export const createUserWithAssociatedEmptyProfile = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<User> => {
  const user = await globalThis.prisma.user.create({
    data: {
      email,
      password
    }
  })

  await globalThis.prisma.profile.create({
    data: {
      userId: user.id
    }
  })

  return user
}

export const updateUserPasswordUnchecked = async (
  user: UserOrId,
  password: string
) => {
  user = await resolveUserByUserOrId(user)

  const encryptedPassword = await encryptPassword(password)

  await globalThis.prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: encryptedPassword
    }
  })
}

export const getUserWithProfile = async (user: UserOrId) => {
  const id = resolveIdByUserOrId(user)

  return await globalThis.prisma.user.findUnique({
    where: {
      id
    },
    include: {
      profile: true
    }
  })
}

export const getAllUsers = async ({
  page,
  pageSize
}: {
  page: number
  pageSize: number
}) => {
  const users = await globalThis.prisma.user.findMany({
    include: { profile: true },
    skip: page * pageSize,
    take: pageSize
  })

  const usersCount = await globalThis.prisma.user.count()

  return {
    data: users,
    meta: createPaginationMeta(users, usersCount, pageSize, page)
  }
}

export const getUserFullInfoById = async (
  userId: number,
  {
    purchasesWhere = {}
  }: {
    purchasesWhere?: Prisma.PurchaseWhereInput
  }
) => {
  const user = await globalThis.prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      _count: {
        select: {
          boxPurchases: true,
          purchases: true
        }
      },
      purchases: {
        where: purchasesWhere
      },
      transactions: true,
      profile: true
    }
  })

  if (!user) {
    throw new NotFoundException()
  }

  const boxPurchases = await getFullUserBoxPurchases(user, {
    status: undefined
  })

  return {
    ...user,
    boxPurchases
  }
}

export const updateOrCreateUserProfile = async (
  user: UserOrId,
  profile: UpdateProfileDto
) => {
  user = await resolveUserByUserOrId(user)
  const userId = resolveIdByUserOrId(user)

  const userProfile = await globalThis.prisma.profile.findUnique({
    where: {
      userId
    }
  })

  if (!userProfile) {
    await globalThis.prisma.profile.create({
      data: {
        userId,
        ...profile
      }
    })

    if (user.activityLogged && !user.isActivityCheckComplete) {
      await globalThis.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          isActiveUser: !user.arbitrageBonusBan,
          isActivityCheckComplete: true
        }
      })
    }
  } else {
    await globalThis.prisma.profile.update({
      where: {
        userId
      },
      data: Object.assign(userProfile, profile)
    })
  }

  return await globalThis.prisma.profile.findUnique({
    where: {
      userId
    }
  })
}

export const updateUserPassword = async (
  user: UserOrId,
  oldPassword: string,
  newPassword: string
) => {
  user = await resolveUserByUserOrId(user)

  if (!(await verifyPassword(oldPassword, user.password))) {
    throw new ForbiddenException()
  }

  await updateUserPasswordUnchecked(user, newPassword)
}

export const markUserActivityLogged = async (user: UserOrId) => {
  const userId = resolveIdByUserOrId(user)

  const userWithProfile = await getUserWithProfile(user)

  if (!userWithProfile) {
    throw new NotFoundException()
  }

  if (userWithProfile.profile) {
    await globalThis.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isActiveUser: !userWithProfile.arbitrageBonusBan,
        isActivityCheckComplete: true
      }
    })
  }

  await globalThis.prisma.user.update({
    where: {
      id: userId
    },
    data: {
      activityLogged: true
    }
  })
}

export const findUserExistsBySignUpIpAddress = async (
  ipAddress: string
): Promise<boolean> => {
  const count = await globalThis.prisma.user.count({
    where: {
      signUpIpAddress: ipAddress
    }
  })

  return count > 0
}
