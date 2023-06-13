import { User } from '@prisma/client'

export type UserOrId = User | User['id']

export const resolveIdByUserOrId = (user: UserOrId) => {
  return typeof user === 'number' ? user : user.id
}

export const resolveUserByUserOrId = async (
  user: UserOrId,
  options?: {
    forceReload: true
  }
): Promise<User> => {
  if (typeof user !== 'number') {
    if (options && options.forceReload) {
      user = user.id
    } else {
      return user
    }
  }

  const dbUser = await globalThis.prisma.user.findUnique({
    where: {
      id: user
    }
  })

  if (!dbUser) {
    throw new Error("User hasn't been found")
  }

  return dbUser
}
