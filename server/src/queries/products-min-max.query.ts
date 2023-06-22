import { FullProductRaw } from '../models/full-product.model.raw'
import { FullProduct } from '../models/product.model'
import { fullProductTransformer } from '../transformers/full-product.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const productsMinMaxQuery = defineQuery<
  {
    categoryId: number
    min: number
    max: number
  },
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
      JOIN "Category" c ON p.category_number = c.category_number
      JOIN "Store_Product" sp ON sp.id_product = "Product".id_product
      LEFT JOIN "Store_Product" sp_promo ON sp."UPC_prom" = sp_promo."UPC"
    WHERE c.category_name = $1
      AND NOT EXISTS (
        SELECT * From "Store_Product" 
        WHERE selling_price > $2
      ) AND NOT EXISTS (
        SELECT * From "Store_Product"
        WHERE selling_price < $3
      )
  `,
  values: (input) => [input.categoryId, input.max, input.min],
  transformResult: (result) =>
    transformQueryResult(fullProductTransformer, result)
})
