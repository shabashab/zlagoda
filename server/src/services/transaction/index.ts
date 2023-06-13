import { Transaction, TransactionKind, TransactionStatus } from '@prisma/client'
import { UserOrId, resolveIdByUserOrId } from '../../helpers/userOrId'
import { NotFoundException } from '../../exceptions/not-found.exception'
import { ConflictException } from '../../exceptions/conflict-exception'

export * from './withdrawals'
export * from './repository'

export const createTransaction = async (
  user: UserOrId,
  kind: TransactionKind,
  amount: number,
  purchaseId?: string,
  description?: any
): Promise<Transaction> => {
  const userId = resolveIdByUserOrId(user)

  return await globalThis.prisma.transaction.create({
    data: {
      userId,
      amount,
      transactionKind: kind,
      forBoxPurchaseId: purchaseId,
      description
    }
  })
}

export const planTransactionExecution = async (
  transactionId: string,
  planAt: Date
) => {
  return await globalThis.prisma.transaction.update({
    where: {
      id: transactionId
    },
    data: {
      status: TransactionStatus.planned,
      plannedAt: planAt
    }
  })
}

const performTransactionBalanceChange = async (transaction: Transaction) => {
  const transactionUser = await globalThis.prisma.user.findUnique({
    where: {
      id: transaction.userId
    }
  })

  if (!transactionUser) {
    throw new NotFoundException("Transaction user hasn't been found")
  }

  if (
    transaction.amount < 0 &&
    transactionUser.withdrawBalance < transaction.amount * -1
  ) {
    throw new Error('Illegal transaction. Insufficient balance')
  }

  await globalThis.prisma.user.update({
    where: {
      id: transactionUser.id
    },
    data: {
      withdrawBalance: transactionUser.withdrawBalance + transaction.amount
    }
  })
}

export const prePayTransaction = async (transaction: Transaction) => {
  await performTransactionBalanceChange(transaction)

  await globalThis.prisma.transaction.update({
    where: {
      id: transaction.id
    },
    data: {
      status: TransactionStatus.prePaid
    }
  })
}

export const completeTransaction = async (transaction: Transaction) => {
  await performTransactionBalanceChange(transaction)

  await globalThis.prisma.transaction.update({
    where: {
      id: transaction.id
    },
    data: {
      status: TransactionStatus.completed,
      completedAt: new Date()
    }
  })
}

export const completePlannedTransactions = async (): Promise<string[]> => {
  const currentDate = new Date()

  const transactionsToComplete = await globalThis.prisma.transaction.findMany({
    where: {
      status: TransactionStatus.planned,
      plannedAt: {
        lte: currentDate
      }
    },
    orderBy: {
      plannedAt: 'asc'
    }
  })

  const completedTransactionIds = []

  for (const transaction of transactionsToComplete) {
    await completeTransaction(transaction)

    completedTransactionIds.push(transaction.id)
  }

  return completedTransactionIds
}

export const cancelTransactionById = async (id: string, reason?: any) => {
  const transaction = await globalThis.prisma.transaction.findUnique({
    where: { id }
  })

  if (!transaction) {
    throw new NotFoundException()
  }

  if (transaction.status === TransactionStatus.canceled) {
    throw new ConflictException('Transaction is already canceled')
  }

  if (
    transaction.status !== TransactionStatus.created &&
    transaction.status !== TransactionStatus.planned
  ) {
    const transactionUser = await globalThis.prisma.user.findUnique({
      where: {
        id: transaction.userId
      }
    })

    if (!transactionUser) {
      throw new NotFoundException("Transaction user hasn't been found")
    }

    await globalThis.prisma.user.update({
      where: {
        id: transactionUser.id
      },
      data: {
        withdrawBalance: transactionUser.withdrawBalance - transaction.amount
      }
    })
  }

  const description = reason
    ? {
        ...(typeof transaction.description === 'object'
          ? transaction.description
          : { oldDescription: transaction.description }),
        cancelReason: reason
      }
    : undefined

  await globalThis.prisma.transaction.update({
    where: {
      id
    },
    data: {
      status: TransactionStatus.canceled,
      description
    }
  })

  return await globalThis.prisma.transaction.findUnique({
    where: { id }
  })
}
