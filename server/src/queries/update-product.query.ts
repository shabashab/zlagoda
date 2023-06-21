import { Product } from '../models/product.model'
import { ProductRaw } from '../models/product.model.raw'
import { productTransformer } from '../transformers/product.transformer'
import { defineQuery } from './define-query'
import { UpdateProductQueryInput } from './types/update-product.query-input'

export const updateProductQuery = defineQuery<
  [number, UpdateProductQueryInput],
  Product,
  ProductRaw
>({
  query: `
    UPDATE "Product" SET (
      "category_number",
      "product_name",
      "characteristics"
    ) = (
      $2, $3, $4
    ) WHERE "id_product" = $1
    RETURNING *
  `,
  values: (input) => [
    input[0],
    input[1].categoryId,
    input[1].name,
    input[1].characteristics
  ],
  transformResult: (result) => productTransformer.transform(result.rows[0])
})
