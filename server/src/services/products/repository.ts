import { CreateProductDto } from '../../dto/create-product.dto'
import { FindProductsFilterDto } from '../../dto/find-products-filter.dto'
import { FullProduct } from '../../models/product.model'
import { StoreProduct } from '../../models/store-product.model'
import { createProductQuery } from '../../queries/create-product.query'
import { createStoreProductQuery } from '../../queries/create-store-product.query'
import { findFullProductByUpcQuery } from '../../queries/find-full-product-by-upc.query'
import { findFullProductsQuery } from '../../queries/find-full-products.query'
import { updateStoreProductQuery } from '../../queries/update-store-product.query'

const createPromoProductUpc = (storeProductUpc: string) => {
  return 'P' + storeProductUpc.slice(1)
}

const createPromoProductPrice = (storeProductPrice: number) => {
  return storeProductPrice * 0.8
}

const createPromoProductForStoreProduct = async (
  storeProduct: StoreProduct
): Promise<StoreProduct> => {
  const promoUpc = createPromoProductUpc(storeProduct.upc)
  const promoPrice = createPromoProductPrice(storeProduct.price)

  const promoStoreProduct = await createStoreProductQuery.execute({
    upc: promoUpc,
    number: storeProduct.number,
    price: promoPrice,
    productId: storeProduct.productId
  })

  await updateStoreProductQuery.execute([
    storeProduct.upc,
    {
      ...storeProduct,
      upcPromotional: promoStoreProduct.upc
    }
  ])

  return promoStoreProduct
}

export const createProduct = async (
  createProductDto: CreateProductDto
): Promise<FullProduct> => {
  const product = await createProductQuery.execute(createProductDto)
  const storeProduct = await createStoreProductQuery.execute({
    upc: createProductDto.upc,
    number: createProductDto.number,
    price: createProductDto.price,
    productId: product.id
  })

  if (createProductDto.isPromo) {
    await createPromoProductForStoreProduct(storeProduct)
  }

  return await findFullProductByUpc(storeProduct.upc)
}

export const findAllFullProducts = (
  findProductsFilter: FindProductsFilterDto
) => findFullProductsQuery.execute(findProductsFilter)
export const findFullProductByUpc = (upc: string) =>
  findFullProductByUpcQuery.execute(upc)
