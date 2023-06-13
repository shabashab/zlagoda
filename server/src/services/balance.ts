import { TransactionKind, TransactionStatus } from '@prisma/client'
import { UserOrId, resolveIdByUserOrId } from '../helpers/userOrId'

export const getBalanceStatsForUser = async (user: UserOrId) => {
  const userId = resolveIdByUserOrId(user)

  const transactionsGroup = await globalThis.prisma.transaction.groupBy({
    by: ['transactionKind'],
    where: {
      userId,
      status: TransactionStatus.completed
    },
    _sum: {
      amount: true
    }
  })

  const totalIncome =
    transactionsGroup.find(
      (group) => group.transactionKind === TransactionKind.income
    )?._sum.amount ?? 0

  const totalWithdrawed =
    transactionsGroup.find(
      (group) => group.transactionKind === TransactionKind.withdraw
    )?._sum.amount ?? 0

  return {
    totalIncome,
    totalWithdrawed
  }
}
