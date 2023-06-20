import { Product } from '../models/product.model'
import { ProductRaw } from '../models/product.model.raw'
import { productTransformer } from '../transformers/product.transformer'
import { defineQuery } from './define-query'
import { CreateProductQueryInput } from './types/create-product.query-input'

export const createProductQuery = defineQuery<
  CreateProductQueryInput,
  Product,
  ProductRaw
>({
  query: `
    INSERT INTO "Product" (
      "category_number",
      "product_name",
      "characteristics"
    ) VALUES (
      $1, $2, $3
    ) RETURNING *
  `,
  values: (input) => [input.categoryId, input.name, input.characteristics],
  transformResult: (result) => productTransformer.transform(result.rows[0])
})
