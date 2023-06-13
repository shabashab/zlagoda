import { TransactionKind } from '@prisma/client'
import { createTransaction, planTransactionExecution } from '../transaction'

export const createPlannedIncomeTransactionsForBoxPurchases = async (
  boxPurchaseIds: string[]
) => {
  const boxPurchases = await globalThis.prisma.boxPurchase.findMany({
    where: {
      id: {
        in: boxPurchaseIds
      }
    },
    include: {
      box: {
        select: {
          duration: true,
          payoutsCount: true,
          percentage: true
        }
      }
    }
  })

  for (const boxPurchase of boxPurchases) {
    const daysBetweenPayouts =
      boxPurchase.box.duration / boxPurchase.box.payoutsCount
    const totalPurchaseAmount = boxPurchase.quotaAmount * boxPurchase.quota
    const totalIncome = totalPurchaseAmount * boxPurchase.box.percentage
    const incomePerPayout = totalIncome / boxPurchase.box.payoutsCount

    const payoutDates = [] as {
      amount: number
      date: Date
    }[]

    const dateCurrent = new Date()
    dateCurrent.setHours(0, 0, 0)

    for (let i = 0; i < boxPurchase.box.payoutsCount; i++) {
      dateCurrent.setDate(dateCurrent.getDate() + daysBetweenPayouts)

      payoutDates.push({
        amount: incomePerPayout,
        date: new Date(dateCurrent.getTime())
      })
    }

    payoutDates[payoutDates.length - 1].amount +=
      boxPurchase.quota * boxPurchase.quotaAmount

    for (const payoutDate of payoutDates) {
      const transaction = await createTransaction(
        boxPurchase.userId,
        TransactionKind.income,
        payoutDate.amount,
        boxPurchase.id
      )

      await planTransactionExecution(transaction.id, payoutDate.date)
    }
  }
}
