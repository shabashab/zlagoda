export interface Product {
  upc: string
  name: string
  manufacture?: string
  price: number
  promoPrice?: number
  characteristics?: string
  isPromo: boolean
  number: number
  categoryId: number
}
