import { PurchaseStatus } from '@prisma/client'
import { PurchaseWithSum, getPurchasesWithSum } from '../purchase'
import { NotFoundException } from '../../exceptions/not-found.exception'

export const getAllReferers = async () => {
  return await globalThis.prisma.user.findMany({
    where: {
      isArbitrage: true
    },
    include: {
      profile: true,
      _count: {
        select: {
          referals: true
        }
      }
    }
  })
}

export const getFullRefererInfo = async (id: number) => {
  const refererInfo = await globalThis.prisma.user.findUnique({
    where: {
      id
    },
    include: {
      profile: true,
      referals: {
        include: {
          purchases: {
            select: {
              id: true
            },
            where: {
              status: {
                in: [PurchaseStatus.paid, PurchaseStatus.confirmed]
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
          }
        }
      },
      _count: {
        select: {
          referals: true
        }
      }
    }
  })

  if (!refererInfo) {
    throw new NotFoundException()
  }

  const purchaseIds = refererInfo.referals.reduce((prev, cur) => {
    prev.push(...cur.purchases.map((value) => value.id))
    return prev
  }, [] as string[])

  const purchasesWithSum = await getPurchasesWithSum({
    id: {
      in: purchaseIds
    }
  })

  const purchasesWithSumMap = new Map<string, PurchaseWithSum>()

  for (const purchaseWithSum of purchasesWithSum) {
    purchasesWithSumMap.set(purchaseWithSum.id, purchaseWithSum)
  }

  refererInfo.referals = refererInfo.referals.map((referal) => {
    referal.purchases = referal.purchases
      .map((purchase) => purchasesWithSumMap.get(purchase.id))
      .filter(Boolean) as PurchaseWithSum[]
    return referal
  })

  return {
    ...refererInfo
  }
}
