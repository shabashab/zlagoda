import { CustomerCard } from '../models/customer-card.model'

export type CreateCustomerCardDto = Omit<
  CustomerCard,
  'averageProductsPerCheck' | 'purchasedTotal'
>
