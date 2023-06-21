import { defineQuery } from './define-query'

export const deleteCustomerCardQuery = defineQuery<string, void, {}>({
  query: `
    DELETE FROM "Customer_Card" WHERE "card_number" = $1
  `,
  values: (input) => [input],
  transformResult: () => {}
})
