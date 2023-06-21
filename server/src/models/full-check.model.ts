import { CheckWithCashier } from './check.model'
import { FullProduct } from './product.model'
export interface FullCheckEntry {
  product: FullProduct
  soldPrice: number
  number: number
}

export interface FullCheck extends CheckWithCashier {
  items: FullCheckEntry[]
}
