import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { Transformer, createTransformer } from './transformer'

export const customerCardTransformer: Transformer<
  CustomerCardRaw,
  CustomerCard
> = createTransformer<CustomerCardRaw>()
  .map('card_number', 'cardNumber')
  .map('cust_name', 'name')
  .map('cust_surname', 'surname')
  .map('cust_patronymic', 'patronymic')
  .map('phone_number', 'phoneNumber')
  .map('zip_code', 'zipCode')
  .copy('city')
  .copy('street')
  .copy('percent')
  .mapTransformed(
    'avg_products_per_check',
    'averageProductsPerCheck',
    (value) => (value ? parseFloat(value) : null)
  )
  .mapTransformed('purchased_total', 'purchasedTotal', (value) =>
    value ? parseFloat(value) : null
  )
