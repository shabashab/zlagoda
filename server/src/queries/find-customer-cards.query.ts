import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { customerCardTransformer } from '../transformers/customer-card.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findCustomerCardsQuery = defineQuery<
  void,
  CustomerCard[],
  CustomerCardRaw
>({
  query: 'SELECT * FROM "Customer_Card"',
  values: () => [],
  transformResult: (result) => {
    return transformQueryResult(customerCardTransformer, result)
  }
})
