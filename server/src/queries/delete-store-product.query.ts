import { StoreProduct } from '../models/store-product.model'
import { StoreProductRaw } from '../models/store-product.model.raw'
import { storeProductTransformer } from '../transformers/store-product.transformer'
import { defineQuery } from './define-query'

export const deleteStoreProductQuery = defineQuery<
  string,
  StoreProduct,
  StoreProductRaw
>({
  query: `
    DELETE FROM "Store_Product" WHERE "UPC" = $1 RETURNING *
  `,
  values: (input) => [input],
  transformResult: (result) =>
    storeProductTransformer.transform(result.rows[0])
})
