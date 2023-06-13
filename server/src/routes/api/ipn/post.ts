import { RouteOptions } from 'fastify'
import { BadRequestException } from '@exceptions/bad-request.exception'
import {
  cancelPurchase,
  confirmPurchasePayment,
  getPurchaseById
} from '@services/purchase'
import { PurchaseStatus } from '@prisma/client'

export const options: RouteOptions = {
  url: '/',
  method: 'POST',
  handler: async (req) => {
    const data = req.body as unknown

    if (!data || typeof data !== 'object') {
      throw new BadRequestException('Invalid webhook')
    }

    if ('ipn_type' in data && data.ipn_type !== 'api') {
      throw new BadRequestException('Not an api ipn')
    }

    if (!('invoice' in data) || typeof data.invoice !== 'string') {
      throw new BadRequestException()
    }

    const purchaseId = data.invoice

    if (!('status' in data) || typeof data.status !== 'string') {
      throw new BadRequestException()
    }

    const status = parseInt(data.status)

    const purchase = await getPurchaseById(purchaseId)

    if (purchase.status !== PurchaseStatus.confirmingPayment) {
      return {
        message: 'Purchase is not confirming payment'
      }
    }

    if (status < 0 || Number.isNaN(status)) {
      await cancelPurchase(purchase)

      // Delete purchase if it is canceled
      return { message: `Canceled purchase ${purchaseId}` }
    } else if (status >= 100) {
      // Update purchase if it is completed
      // return `Completed purchase ${purchaseId}`
      await confirmPurchasePayment(purchase)

      return {
        message: 'Purchase completed'
      }
    } else {
      return {
        message: 'Webhook ignored'
      }
    }
  }
}
