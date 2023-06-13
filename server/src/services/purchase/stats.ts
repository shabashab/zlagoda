import { PurchaseStatus, TransactionKind } from '@prisma/client'
import { UserOrId, resolveIdByUserOrId } from '../../helpers/userOrId'
import { getPurchasesWithSum } from './repository'

interface UserPurchaseStats {
  boxesBought: {
    [key: string]: number
  }
  totalPurchasedBoxesCount: number
}

export const getUserPurchaseStats = async (
  user: UserOrId
): Promise<UserPurchaseStats> => {
  const userId = resolveIdByUserOrId(user)

  const groupResult = await globalThis.prisma.boxPurchase.groupBy({
    by: ['boxId'],
    where: {
      userId,
      purchase: {
        status: {
          not: PurchaseStatus.canceled
        }
      }
    },
    _sum: {
      quotaAmount: true
    }
  })

  const boxesBought = Object.fromEntries(
    groupResult.map((res) => {
      const sum = res._sum.quotaAmount ? res._sum.quotaAmount : 0

      return [res.boxId, sum]
    })
  )

  const totalPurchasedBoxesCount = Object.values(boxesBought).reduce(
    (prev, cur) => prev + cur,
    0
  )

  return {
    boxesBought,
    totalPurchasedBoxesCount
  }
}

export const getAdminPurchaseStats = async () => {
  const purchasesWithSums = await getPurchasesWithSum({
    status: {
      in: [PurchaseStatus.confirmed, PurchaseStatus.paid]
    }
  })

  const totalPurchaseSum = purchasesWithSums.reduce((prev, curr) => {
    return curr.totalSum + prev
  }, 0)

  const totalWithdrawalTransactionsSumAggregate =
    await globalThis.prisma.transaction.aggregate({
      where: {
        transactionKind: TransactionKind.withdraw
      },
      _sum: {
        amount: true
      }
    })

  const totalWithdrawalSum =
    totalWithdrawalTransactionsSumAggregate._sum?.amount ?? 0

  return {
    totalPurchaseSum,
    totalWithdrawalSum
  }
}
