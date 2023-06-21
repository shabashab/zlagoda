import { StoreProduct } from '../models/store-product.model'
import { StoreProductRaw } from '../models/store-product.model.raw'
import { storeProductTransformer } from '../transformers/store-product.transformer'
import { defineQuery } from './define-query'

export const findStoreProductByUpcQuery = defineQuery<
  string,
  StoreProduct,
  StoreProductRaw
>({
  query: `
    SELECT * FROM "Store_Product" WHERE "UPC" = $1
  `,
  values: (input) => [input],
  transformResult: (result) =>
    storeProductTransformer.transform(result.rows[0])
})
