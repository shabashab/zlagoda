import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient
}

export const name = 'prisma'

export const init = () => {
  global.prisma = new PrismaClient()
}
