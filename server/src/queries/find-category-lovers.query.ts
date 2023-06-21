import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { customerCardTransformer } from '../transformers/customer-card.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findCategoryLoversQuery = defineQuery<
  number,
  CustomerCard[],
  CustomerCardRaw
>({
  query: `
    SELECT *
    FROM "Customer_Card" AS customer
      WHERE NOT EXISTS (SELECT * FROM "Check" as "check"
        WHERE NOT EXISTS (SELECT * 
          FROM "Sale" sale 
            INNER JOIN ("Store_Product" sp
              INNER JOIN "Product" p 
                ON sp.id_product = p.id_product
              ) ON sp."UPC" = sale."UPC"
            WHERE p.category_number = $1
              AND sale.check_number = "check".check_number
      ) AND "check".card_number = customer.card_number
    )
  `,
  values: (input) => [input],
  transformResult: (result) =>
    transformQueryResult(customerCardTransformer, result)
})
