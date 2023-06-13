import { TransactionKind, TransactionStatus } from '@prisma/client'
import { NotFoundException } from '../../exceptions/not-found.exception'
import {
  cancelTransactionById,
  completeTransaction,
  createTransaction,
  prePayTransaction
} from '.'
import { ConflictException } from '../../exceptions/conflict-exception'
import { UserOrId } from '../../helpers/userOrId'
import { createPaginationMeta } from '../../helpers/createPaginationMeta'

export const getAllWithdrawals = async ({
  page = 0,
  pageSize = 10
}: {
  page?: number
  pageSize?: number
}) => {
  const resultData = await globalThis.prisma.transaction.findMany({
    where: {
      transactionKind: TransactionKind.withdraw
    },
    include: {
      user: {
        select: {
          email: true,
          profile: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: pageSize,
    skip: pageSize * page
  })

  const count = await globalThis.prisma.transaction.count({
    where: {
      transactionKind: TransactionKind.withdraw
    }
  })

  return {
    data: resultData,
    meta: createPaginationMeta(resultData, count, pageSize, page)
  }
}

export const acceptWithdrawalById = async (id: string) => {
  const transaction = await globalThis.prisma.transaction.findUnique({
    where: {
      id
    }
  })

  if (!transaction) {
    throw new NotFoundException()
  }

  if (transaction.status !== TransactionStatus.prePaid) {
    throw new ConflictException(
      'Withdrawal should be prePaid in order to complete it'
    )
  }

  await completeTransaction(transaction)

  return await globalThis.prisma.transaction.findUnique({
    where: { id }
  })
}

export const createWithdrawal = async (
  user: UserOrId,
  amount: number,
  wallet: string
) => {
  const transaction = await createTransaction(
    user,
    TransactionKind.withdraw,
    amount * -1,
    undefined,
    {
      wallet
    }
  )

  try {
    await prePayTransaction(transaction)
  } catch (e) {
    await cancelTransactionById(transaction.id, e)

    throw e
  }

  return await globalThis.prisma.transaction.findUnique({
    where: { id: transaction.id }
  })
}
