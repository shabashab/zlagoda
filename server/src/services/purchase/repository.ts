import {
  BoxPurchase,
  BoxPurchaseStatus,
  DepositType,
  Prisma,
  Purchase,
  PurchaseStatus,
  TransactionStatus,
  User
} from '@prisma/client'
import {
  UserOrId,
  resolveIdByUserOrId,
  resolveUserByUserOrId
} from '@helpers/userOrId'
import { NotFoundException } from '@exceptions/not-found.exception'
import { createPlannedIncomeTransactionsForBoxPurchases } from '../income'
import { ConflictException } from '@exceptions/conflict-exception'
import { BoxPurchasePayout, FullBoxPurchase } from './types'
import { omit } from 'lodash'
import { createPaginationMeta } from '@helpers/createPaginationMeta'
import { getUserPurchaseStats } from './stats'
import { getAllBoxesMap, getBoxesMap } from '../box'

export interface CreatePurchaseBoxes {
  [key: string]: number
}

export interface BoxPurchaseWithSum extends BoxPurchase {
  totalSum: number
}

export interface PurchaseWithSum extends Purchase {
  totalSum: number
}

export interface FullPurchase extends PurchaseWithSum {
  boxPurchases: BoxPurchaseWithSum[]
}

export const getPurchasesWithSum = async (
  where: Prisma.PurchaseWhereInput = {},
  include?: Prisma.PurchaseInclude,
  take?: number,
  skip?: number,
  orderBy?:
    | Prisma.PurchaseOrderByWithRelationInput
    | Prisma.PurchaseOrderByWithRelationInput[]
): Promise<PurchaseWithSum[]> => {
  const purchases = await globalThis.prisma.purchase.findMany({
    where,
    include,
    take,
    skip,
    orderBy
  })

  const sums = await globalThis.prisma.boxPurchase.groupBy({
    by: ['purchaseId', 'quota'],
    where: {
      purchaseId: {
        in: purchases.map((purchase) => purchase.id)
      }
    },
    _sum: {
      quotaAmount: true
    }
  })

  const totalSums = sums
    .map((value) => ({
      total: value.quota * (value._sum.quotaAmount || 0),
      purchaseId: value.purchaseId
    }))
    .reduce(
      (previous, current) => {
        if (current.purchaseId in previous) {
          previous[current.purchaseId] += current.total
        } else {
          previous[current.purchaseId] = current.total
        }

        return previous
      },
      {} as {
        [key: string]: number
      }
    )

  return purchases.map((purchase) => ({
    ...purchase,
    totalSum: totalSums[purchase.id] || 0
  }))
}

export const getPurchasesWithSumForUser = async (
  user: UserOrId,
  filter: Prisma.PurchaseWhereInput = {}
): Promise<PurchaseWithSum[]> => {
  const userId = resolveIdByUserOrId(user)

  return getPurchasesWithSum(
    {
      userId,
      ...filter
    },
    undefined,
    undefined,
    undefined,
    {
      createdAt: 'desc'
    }
  )
}

export const getPurchaseById = async (
  id: string,
  include?: Prisma.PurchaseInclude
) => {
  const purchase = await globalThis.prisma.purchase.findUnique({
    where: {
      id
    },
    include
  })

  if (!purchase) {
    throw new NotFoundException()
  }

  return purchase
}

export const createPurchaseForUser = async (
  user: UserOrId,
  boxes: CreatePurchaseBoxes
): Promise<Purchase> => {
  user = await resolveUserByUserOrId(user)

  const validationResult = await validateCreateBoxPurchases(user, boxes)

  if (typeof validationResult === 'string') {
    throw new ConflictException(validationResult)
  }

  const purchase = await globalThis.prisma.purchase.create({
    data: {
      userId: user.id
    }
  })

  await createBoxPurchasesForPurchase(user, purchase.id, boxes)

  return purchase
}

export const cancelPurchase = async (purchase: Purchase) => {
  if (purchase.status !== PurchaseStatus.awaitingPayment) {
    throw new ConflictException()
  }

  await globalThis.prisma.purchase.update({
    where: {
      id: purchase.id
    },
    data: {
      status: PurchaseStatus.canceled
    }
  })
}

export const activatePurchase = async (purchase: Purchase) => {
  await globalThis.prisma.boxPurchase.updateMany({
    where: {
      purchaseId: purchase.id
    },
    data: {
      status: BoxPurchaseStatus.active,
      statusChangedAt: new Date(),
      activatedAt: new Date()
    }
  })

  await globalThis.prisma.purchase.update({
    where: {
      id: purchase.id
    },
    data: {
      status: PurchaseStatus.confirmed
    }
  })

  const boxPurchases = await globalThis.prisma.boxPurchase.findMany({
    where: {
      purchaseId: purchase.id
    },
    select: {
      id: true
    }
  })

  await createPlannedIncomeTransactionsForBoxPurchases(
    boxPurchases.map((boxPurchase) => boxPurchase.id)
  )
}

export const confirmPurchasePayment = async (purchase: Purchase) => {
  await globalThis.prisma.purchase.update({
    where: {
      id: purchase.id
    },
    data: {
      status: PurchaseStatus.paid
    }
  })
}

export const recalculateBoxPurchaseFinished = async () => {
  const query = Prisma.sql`
    SELECT bp.id AS id 
    FROM "BoxPurchase" AS bp 
      INNER JOIN "Box" b 
      ON bp."boxId" = b."id" 
    WHERE (
      SELECT COUNT(*) 
      FROM "Transaction" tr 
      WHERE tr."forBoxPurchaseId" = bp.id AND 
        tr.status = 'completed'
      ) >= b."payoutsCount" 
      AND bp."status" <> 'finished'
  `

  const finishedBoxPurchases = (await globalThis.prisma.$queryRaw(query)) as {
    id: string
  }[]

  await globalThis.prisma.boxPurchase.updateMany({
    where: {
      id: {
        in: finishedBoxPurchases.map((boxPurchase) => boxPurchase.id)
      }
    },
    data: {
      status: BoxPurchaseStatus.finished,
      finishedAt: new Date()
    }
  })
}

const createBoxPurchasesForPurchase = async (
  user: UserOrId,
  purchaseId: string,
  boxes: CreatePurchaseBoxes
) => {
  const userId = resolveIdByUserOrId(user)

  const boxesMap = await getBoxesMap({
    id: {
      in: Object.keys(boxes)
    }
  })

  const data = Object.entries(boxes).map(([boxId, amount]) => ({
    userId,
    purchaseId,
    quota: boxesMap[boxId].quota,
    quotaAmount: amount,
    boxId
  }))

  await globalThis.prisma.boxPurchase.createMany({
    data
  })
}

const validateCreateBoxPurchases = async (
  user: UserOrId,
  boxes: CreatePurchaseBoxes
): Promise<true | string> => {
  const boxMap = await getAllBoxesMap()
  const boxMaxCountMap = Object.fromEntries(
    Object.entries(boxMap).map(([boxId, box]) => {
      return [boxId, box.maxCount]
    })
  )

  const stats = await getUserPurchaseStats(user)
  const purchasedBoxesCountMap = stats.boxesBought

  const invalidBoxes = Object.entries(purchasedBoxesCountMap)
    .map<[string, number]>(([boxId, count]) => {
      const maxCount = boxMaxCountMap[boxId]

      // If maxCount is null for boxId, then the count doesn't matter
      if (maxCount === null) {
        return [boxId, 0]
      }

      // Leftover count of boxes a user can buy for the current boxId
      const leftoverCount = maxCount - count - boxes[boxId]

      return [boxId, leftoverCount]
    })
    .filter(([_, leftoverCount]) => leftoverCount < 0)

  if (invalidBoxes.length === 0) {
    return true
  }

  return `Cannot buy more boxes with id ${invalidBoxes[0][0]}`
}

const findLastIndex = <T>(
  arr: T[],
  predicate: (value: T) => boolean
): number => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return i
    }
  }

  return -1
}

const findNextActivationDate = (referenceDate: Date = new Date()) => {
  const dateCopy = new Date(referenceDate.getTime())

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
    )
  )

  return nextMonday
}

const getPlannedActivationTimeForBoxPurchase = (
  boxPurchase: BoxPurchase,
  referenceDate: Date
) => {
  if (boxPurchase.status !== BoxPurchaseStatus.pending) {
    return undefined
  }

  return findNextActivationDate(referenceDate)
}

export const getFullUserBoxPurchases = async (
  user: User,
  where: Prisma.BoxPurchaseWhereInput = {}
): Promise<FullBoxPurchase[]> => {
  const userId = resolveIdByUserOrId(user)

  const boxPurchases = await globalThis.prisma.boxPurchase.findMany({
    where: {
      userId,
      ...where,
      purchase: {
        status: {
          in: [PurchaseStatus.paid, PurchaseStatus.confirmed]
        }
      }
    },
    orderBy: [
      {
        status: 'asc'
      },
      {
        activatedAt: 'desc'
      }
    ],
    include: {
      transactions: {
        orderBy: {
          completedAt: 'asc'
        }
      },
      box: true,
      _count: {
        select: {
          transactions: true
        }
      }
    }
  })

  const currentDate = new Date()

  return boxPurchases.map<FullBoxPurchase>((boxPurchase) => {
    const sum = boxPurchase.quota * boxPurchase.quotaAmount
    const lastCompletedId = findLastIndex(
      boxPurchase.transactions,
      (transaction) => transaction.status === TransactionStatus.completed
    )

    const activationPlannedAt = getPlannedActivationTimeForBoxPurchase(
      boxPurchase,
      currentDate
    )

    const payouts = boxPurchase.transactions
      .map<BoxPurchasePayout | undefined>((transaction) => {
        if (!transaction.plannedAt) return undefined

        return {
          completed: transaction.status === TransactionStatus.completed,
          amount: transaction.amount,
          plannedAt: transaction.plannedAt
        }
      })
      .filter(Boolean) as BoxPurchasePayout[]

    return {
      ...omit(boxPurchase, '_count', 'transactions'),
      totalSum: sum,
      lastCompletedPayoutId: lastCompletedId,
      payouts,
      activationPlannedAt
    }
  })
}

export const getFullPurchaseById = async (
  purchaseId: string
): Promise<FullPurchase> => {
  const purchases = await globalThis.prisma.purchase.findUnique({
    where: {
      id: purchaseId
    },
    include: {
      boxPurchases: true
    }
  })

  if (!purchases) {
    throw new NotFoundException()
  }

  const boxPurchasesWithSum = purchases.boxPurchases.map((boxPurchase) => ({
    ...boxPurchase,
    totalSum: boxPurchase.quota * boxPurchase.quotaAmount
  }))

  const purchasesTotal = boxPurchasesWithSum.reduce(
    (sum, boxPurchase) => sum + boxPurchase.quota * boxPurchase.quotaAmount,
    0
  )

  return {
    ...purchases,
    boxPurchases: boxPurchasesWithSum,
    totalSum: purchasesTotal
  }
}

export const getAllBankDepositPurchases = async ({
  page,
  pageSize
}: {
  page: number
  pageSize: number
}) => {
  const purchases = await getPurchasesWithSum(
    {
      depositType: DepositType.card
    },
    undefined,
    pageSize,
    page * pageSize,
    [
      {
        createdAt: 'desc'
      },
      {
        status: 'desc'
      }
    ]
  )

  const purchasesCount = await globalThis.prisma.purchase.count({
    where: {
      depositType: DepositType.card
    }
  })

  return {
    data: purchases,
    meta: createPaginationMeta(purchases, purchasesCount, pageSize, page)
  }
}

export const confirmAllPaidPurchases = async () => {
  const paidPurchases = await globalThis.prisma.purchase.findMany({
    where: {
      status: PurchaseStatus.paid
    }
  })

  const confirmedPurchases = []
  const failed = []

  for (const purchase of paidPurchases) {
    try {
      await activatePurchase(purchase)
      confirmedPurchases.push(purchase)
    } catch (e) {
      failed.push({
        purchase,
        reason: e
      })
    }
  }

  return {
    confirmedPurchases,
    failed
  }
}
