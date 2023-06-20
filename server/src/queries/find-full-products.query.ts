import { FullProductRaw } from '../models/full-product.model.raw'
import { FullProduct } from '../models/product.model'
import { fullProductTransformer } from '../transformers/full-product.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findFullProductsQuery = defineQuery<
  void,
  FullProduct[],
  FullProductRaw
>({
  query: `
    SELECT 
      p.id_product,
      p.category_number,
      p.product_name,
      p.characteristics,
      sp."UPC",
      sp.products_number,
      sp.selling_price,
      sp_promo.selling_price as promo_price
    FROM "Product" p 
      JOIN "Store_Product" sp ON p."id_product" = sp."id_product"
      LEFT JOIN "Store_Product" sp_promo ON sp."UPC_prom" = sp_promo."UPC"
  `,
  transformResult: (result) =>
    transformQueryResult(fullProductTransformer, result)
})
