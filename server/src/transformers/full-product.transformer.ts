import { FullProductRaw } from '../models/full-product.model.raw'
import { FullProduct } from '../models/product.model'
import { productTransformer } from './product.transformer'
import { Transformer, createTransformer } from './transformer'

export const fullProductTransformer: Transformer<FullProductRaw, FullProduct> =
  createTransformer<FullProductRaw>()
    .extend(productTransformer)
    .map('UPC', 'upc')
    .mapTransformed('products_number', 'number', parseInt)
    .mapTransformed('selling_price', 'price', parseFloat)
    .mapTransformed('promo_price', 'promoPrice', (value) =>
      value ? parseFloat(value) : null
    )
    .map('category_name', 'categoryName')
    .set('isPromo', (_input, prevValue) => !!prevValue.promoPrice)
