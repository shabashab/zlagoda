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
      JOIN "Category" c ON c.category_number = p.category_number
      LEFT JOIN "Store_Product" sp ON sp.id_product = p.id_product
      LEFT JOIN "Store_Product" sp_promo ON sp."UPC_prom" = sp_promo."UPC"
    WHERE c.category_number = $1
      AND NOT EXISTS (
        SELECT * From "Store_Product" spp
        WHERE selling_price > $2 AND sp."UPC" = spp."UPC"
      ) AND NOT EXISTS (
        SELECT * From "Store_Product" spp
        WHERE selling_price < $3 AND sp."UPC" = spp."UPC"
      ) AND sp."promotional_product" = false
  `,
  values: (input) => [input.categoryId, input.max, input.min],
  transformResult: (result) =>
    transformQueryResult(fullProductTransformer, result)
})
