export interface CreateProductDto {
  upc: string
  categoryId: number
  number: number
  price: number
  isPromo?: boolean
  name: string
  characteristics: string
}
