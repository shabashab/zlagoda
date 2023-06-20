import { StoreProduct } from '../models/store-product.model'
import { StoreProductRaw } from '../models/store-product.model.raw'
import { storeProductTransformer } from '../transformers/store-product.transformer'
import { defineQuery } from './define-query'
import { CreateStoreProductQueryInput } from './types/create-store-product.query-input'

export const createStoreProductQuery = defineQuery<
  CreateStoreProductQueryInput,
  StoreProduct,
  StoreProductRaw
>({
  query: `
    INSERT INTO "Store_Product" (
      "UPC",
      "UPC_prom",
      "id_product",
      "selling_price",
      "products_number",
      "promotional_product"
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    ) RETURNING *
  `,
  values: (input) => [
    input.upc,
    input.upcPromotional ?? null,
    input.productId,
    input.price,
    input.number,
    input.isPromotional ?? false
  ],
  transformResult: (result) =>
    storeProductTransformer.transform(result.rows[0])
})
