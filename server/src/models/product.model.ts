import { Nullish } from '../types/nullish'

export interface Product {
  id: number
  categoryId: number
  name: string
  characteristics: string
}

export interface FullProduct extends Product {
  upc: string
  number: number
  price: number
  promoPrice?: Nullish<number>
  isPromo: boolean
  categoryName: string
}
