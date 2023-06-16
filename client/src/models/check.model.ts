import { Product } from './product.model'
export interface Check {
  id?: string
  items: {
    product: Product
    number: number
  }[]
}
