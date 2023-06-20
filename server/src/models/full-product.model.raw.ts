import { ProductRaw } from './product.model.raw'

export interface FullProductRaw extends ProductRaw {
  UPC: string
  products_number: string
  selling_price: string
  promo_price?: string
}
