import { DepositType, Prisma, PurchaseStatus } from '@prisma/client'
import { CreateTransaction } from './payment.interface'
import { PaymentType } from './types'
import { NotFoundException } from '../../exceptions/not-found.exception'
import { PurchaseWithSum, getPurchasesWithSum } from '../purchase'
import { resolveUserByUserOrId } from '../../helpers/userOrId'
import { BadRequestException } from '../../exceptions/bad-request.exception'

export const createPaymentForPurchase = async (
  purchaseId: string,
  paymentType: PaymentType
) => {
  const purchases = await getPurchasesWithSum({
    id: purchaseId
  })

  if (purchases.length === 0) {
    throw new NotFoundException()
  }

  const purchase = purchases[0]

  if (paymentType === 'CARD') {
    return await createCardPaymentForPurchase(purchase)
  }

  return await createCryptoPaymentForPurchase(purchase, paymentType)
}

export const cancelPaymentForPurchaseById = async (purchaseId: string) => {
  const purchase = await globalThis.prisma.purchase.findUnique({
    where: {
      id: purchaseId
    }
  })

  if (!purchase) {
    throw new NotFoundException()
  }

  if (
    !(
      typeof purchase.depositDescription === 'object' &&
      purchase.depositDescription &&
      'id1' in purchase.depositDescription
    ) &&
    purchase.status !== PurchaseStatus.confirmingPayment
  ) {
    throw new BadRequestException()
  }

  await globalThis.prisma.purchase.update({
    where: {
      id: purchaseId
    },
    data: {
      depositType: null,
      depositDescription: Prisma.JsonNull,
      status: PurchaseStatus.awaitingPayment
    }
  })
}

const createCryptoPaymentForPurchase = async (
  purchase: PurchaseWithSum,
  paymentType: PaymentType
) => {
  const user = await resolveUserByUserOrId(purchase.userId)

  const amount = purchase.totalSum + purchase.totalSum * 0.01

  const transactionOptions: CreateTransaction = {
    currency1: 'EUR',
    currency2: paymentType,
    amount,
    buyer_email: user.email,
    invoice: purchase.id
  }

  const coinpaymentsTransaction = await createCoinpaymentsTransaction(
    transactionOptions
  )

  await globalThis.prisma.purchase.update({
    where: {
      id: purchase.id
    },
    data: {
      status: PurchaseStatus.confirmingPayment,
      depositType: DepositType.crypto,
      depositDescription: {
        currency: paymentType,
        coinpaymentsTransaction: coinpaymentsTransaction.txn_id
      }
    }
  })

  return coinpaymentsTransaction
}

const createCardPaymentForPurchase = async (purchase: PurchaseWithSum) => {
  await globalThis.prisma.purchase.update({
    where: {
      id: purchase.id
    },
    data: {
      status: PurchaseStatus.confirmingPayment,
      depositType: DepositType.card
    }
  })

  return {
    message: 'payment confirmed'
  }
}

export const createCoinpaymentsTransaction = async (
  options: CreateTransaction
) => {
  return await globalThis.coinpayments.createTransaction(options)
}

type PaymentPurposeDataPair = {
  id1: number
  id2: number
}

export const getNextUnassignedTransactionPurposeData =
  async (): Promise<PaymentPurposeDataPair> => {
    const query = Prisma.sql`
    SELECT COALESCE(("depositDescription"->>'id1')::int8, 20) as id1, COALESCE(("depositDescription"->>'id2')::int8, 1) as id2 FROM "Purchase" 
    WHERE ("depositDescription"->>'id1') IS NOT NULL 
    AND ("depositDescription"->>'id2') IS NOT NULL 
    ORDER BY ("depositDescription"->>'id1')::bigint DESC, ("depositDescription"->>'id1')::bigint DESC
    LIMIT 1
  `

    const bigIntResult = (await globalThis.prisma.$queryRaw(query)) as {
      [0]: { id1: BigInt; id2: BigInt } | undefined
    }

    if (!bigIntResult[0]) {
      return {
        id1: 20,
        id2: 1
      }
    }

    const result: PaymentPurposeDataPair = {
      id1: Number(bigIntResult[0].id1),
      id2: Number(bigIntResult[0].id2)
    }

    const nextId1 = result.id2 >= 2000 ? result.id1 + 1 : result.id1
    const nextId2 = result.id2 >= 2000 ? 1 : result.id2 + 1

    return {
      id1: nextId1,
      id2: nextId2
    }
  }

export const getOrAssignTransactionPurposeForCardPurchase = async (
  purchaseId: string
) => {
  const purchase = await globalThis.prisma.purchase.findUnique({
    where: {
      id: purchaseId
    }
  })

  if (!purchase) {
    throw new NotFoundException()
  }

  if (
    typeof purchase.depositDescription !== 'object' ||
    !purchase.depositDescription ||
    !('id1' in purchase.depositDescription) ||
    !('id2' in purchase.depositDescription)
  ) {
    const nextPurposeData = await getNextUnassignedTransactionPurposeData()

    await globalThis.prisma.purchase.update({
      where: {
        id: purchaseId
      },
      data: {
        depositDescription: nextPurposeData
      }
    })

    return nextPurposeData
  }

  return purchase.depositDescription
}
