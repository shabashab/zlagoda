import { FullProductRaw } from '../models/full-product.model.raw'
import { FullProduct } from '../models/product.model'
import { fullProductTransformer } from '../transformers/full-product.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findFullProductsByIdsQuery = defineQuery<
  string[],
  FullProduct[],
  FullProductRaw
>({
  query: `
    SELECT 
      p.id_product,
      p.category_number,
      c.category_name,
      p.product_name,
      p.characteristics,
      sp."UPC",
      sp.products_number,
      sp.selling_price,
      sp_promo.selling_price as promo_price
    FROM "Product" p 
      JOIN "Store_Product" sp ON p."id_product" = sp."id_product"
      JOIN "Category" c ON p."category_number" = c."category_number"
      LEFT JOIN "Store_Product" sp_promo ON sp."UPC_prom" = sp_promo."UPC"
    WHERE sp."UPC" = ANY($1::varchar[])
  `,
  values: (input) => [input],
  transformResult: (result) =>
    transformQueryResult(fullProductTransformer, result)
})
