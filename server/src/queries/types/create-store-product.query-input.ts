import { Nullish } from '../../types/nullish'

export interface CreateStoreProductQueryInput {
  upc: string
  upcPromotional?: Nullish<string>
  productId: number
  price: number
  number: number
  isPromotional?: boolean
}
