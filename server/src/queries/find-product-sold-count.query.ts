import { defineQuery } from './define-query'

export const findProductSoldCountQuery = defineQuery<
  {
    upc: string
    from: Date
    to: Date
  },
  number,
  {
    total_number: string
  }
>({
  query: `
    SELECT SUM("product_nuber") as total_number
    FROM "Sale" s JOIN "Check" c ON s."check_number" = c."check_number"
    WHERE s."UPC" = $1 AND c."print_date" > $2 AND c."print_date" < $3
    GROUP BY "UPC"
  `,
  values: (input) => [input.upc, input.from, input.to],
  transformResult: (result) => {
    if (!result.rows[0]?.total_number) return 0

    return parseInt(result.rows[0].total_number)
  }
})
