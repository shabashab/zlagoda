import { NotFoundException } from '../exceptions/not-found.exception'
import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { customerCardTransformer } from '../transformers/customer-card.transformer'
import { defineQuery } from './define-query'

export const findCustomerCardByIdQuery = defineQuery<
  string,
  CustomerCard,
  CustomerCardRaw
>({
  query: 'SELECT * FROM "Customer_Card" WHERE card_number = $1',
  values: (input) => [input],
  transformResult: (result) => {
    if (result.rowCount === 0) {
      throw new NotFoundException(
        "User with given employee id hasn't been found"
      )
    }

    return customerCardTransformer.transform(result.rows[0])
  }
})
