import { defineQuery } from './define-query'

export const findProductSoldCountQuery = defineQuery<
  {
    upc: string
    from: Date
    to: Date
  },
  number,
  {
    total_number: number
  }
>({
  query: `
    SELECT SUM("product_number") as total_number
    FROM "Sale"
    WHERE "UPC" = $1 AND "print_date" > $2 AND "print_date" < $3
    GROUP BY "UPC"
  `,
  values: (input) => [input.upc, input.from, input.to],
  transformResult: (result) => {
    return result.rows[0].total_number
  }
})
