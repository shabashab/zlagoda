import { Box } from '@prisma/client'
import { BoxPurchaseWithSum } from './repository'

export interface BoxPurchasePayout {
  plannedAt: Date
  completed: boolean
  amount: number
}

export interface FullBoxPurchase extends BoxPurchaseWithSum {
  lastCompletedPayoutId: number
  payouts: BoxPurchasePayout[]
  box: Box
  activationPlannedAt?: Date
}
