import { StoreProduct } from '../models/store-product.model'
import { StoreProductRaw } from '../models/store-product.model.raw'
import { Transformer, createTransformer } from './transformer'

export const storeProductTransformer: Transformer<
  StoreProductRaw,
  StoreProduct
> = createTransformer<StoreProductRaw>()
  .map('UPC', 'upc')
  .map('UPC_prom', 'upcPromotional')
  .map('id_product', 'productId')
  .map('selling_price', 'price')
  .map('products_number', 'number')
  .map('promotional_product', 'isPromotional')
