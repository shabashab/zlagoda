import { defineQuery } from './define-query'

export const findChecksWithPriceExcludingQuery = defineQuery<
  {
    priceMin: number
    exclude: string
  },
  string[],
  { check_number: string }
>({
  query: `
    SELECT DISTINCT c.check_number
    FROM (("Check" as c 
      LEFT JOIN "Employee" as e ON (e.id_employee = c.id_employee AND e.empl_role = 'cashier'))
      LEFT JOIN "Sale" as s ON s.check_number = c.check_number)
      WHERE NOT EXISTS (
          SELECT 1
          FROM "Sale" as s1
          WHERE s1.check_number = s.check_number AND s1.check_number = $1
      ) AND NOT EXISTS (
          SELECT 1
          FROM "Sale" as s2
          WHERE s2.check_number = s.check_number AND NOT EXISTS (
              SELECT 1
              FROM "Sale" as s3
              WHERE s3.check_number = s2.check_number AND s3.seling_price < $2
          )
      );
  `,
  values: (input) => [input.exclude, input.priceMin],
  transformResult: (result) => result.rows.map((value) => value.check_number)
})
