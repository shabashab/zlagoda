import { Nullish } from '../../types/nullish'

export type UpdateStoreProductQueryInput = [
  string,
  {
    upcPromotional?: Nullish<string>
    productId: number
    price: number
    number: number
    isPromotional?: boolean
  }
]
