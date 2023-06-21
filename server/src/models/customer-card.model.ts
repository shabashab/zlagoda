export interface CustomerCard {
  cardNumber: string
  name: string
  surname: string
  patronymic?: string | null
  phoneNumber: string
  city?: string | null
  street?: string | null
  zipCode?: string | null
  percent: number
  averageProductsPerCheck: number | null
  purchasedTotal: number | null
}
