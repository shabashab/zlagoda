import { UserOrId, resolveIdByUserOrId } from '@helpers/userOrId'
import { createPaginationMeta } from '../../helpers/createPaginationMeta'
import { Prisma } from '@prisma/client'

export const getUserTransactionsPaginated = async (
  user: UserOrId,
  {
    page,
    pageSize
  }: {
    page: number
    pageSize: number
  },
  where?: Prisma.TransactionWhereInput
) => {
  const userId = resolveIdByUserOrId(user)

  const transactions = await globalThis.prisma.transaction.findMany({
    where: {
      userId,
      ...where
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: page * pageSize,
    take: pageSize
  })

  const transactionsTotalCount = await globalThis.prisma.transaction.count({
    where: {
      userId,
      ...where
    }
  })

  return {
    data: transactions,
    meta: createPaginationMeta(
      transactions,
      transactionsTotalCount,
      pageSize,
      page
    )
  }
}
