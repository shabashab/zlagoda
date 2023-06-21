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
  query: `
    SELECT
      cc."card_number",
      "cust_surname",
      "cust_name",
      "cust_patronymic"
      "phone_number",
      "city",
      "street",
      "zip_code",
      "percent",
      SUM(c."sum_total") as "purchased_total",
      AVG(s_c.total_number) as "avg_products_per_check"
      FROM "Customer_Card" cc
        LEFT JOIN "Check" c ON c."card_number" = cc."card_number"
        LEFT JOIN (
          SELECT check_number, SUM("product_nuber") as total_number FROM "Sale" GROUP BY "check_number"
        ) s_c ON s_c."check_number" = c."check_number"
      WHERE cc."card_number" = $1
      GROUP BY 
        cc."card_number",
        "cust_surname",
        "cust_name",
        "cust_patronymic",
        "phone_number",
        "city",
        "street",
        "zip_code",
        "percent"
  `,
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
