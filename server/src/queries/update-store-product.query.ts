import { StoreProduct } from '../models/store-product.model'
import { StoreProductRaw } from '../models/store-product.model.raw'
import { storeProductTransformer } from '../transformers/store-product.transformer'
import { defineQuery } from './define-query'
import { UpdateStoreProductQueryInput } from './types/update-store-product.query-input'

export const updateStoreProductQuery = defineQuery<
  UpdateStoreProductQueryInput,
  StoreProduct,
  StoreProductRaw
>({
  query: `
    UPDATE "Store_Product" SET (
      "UPC_prom",
      "id_product",
      "selling_price",
      "products_number",
      "promotional_product"
    ) = (
      $2, $3, $4, $5, $6
    ) WHERE "UPC" = $1 RETURNING *
  `,
  values: (input) => [
    input[0],
    input[1].upcPromotional ?? null,
    input[1].productId,
    input[1].price,
    input[1].number,
    input[1].isPromotional ?? false
  ],
  transformResult: (result) =>
    storeProductTransformer.transform(result.rows[0])
})
