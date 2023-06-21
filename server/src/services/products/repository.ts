import { CreateProductDto } from '../../dto/create-product.dto'
import { FindProductsFilterDto } from '../../dto/find-products-filter.dto'
import { UpdateProductDto } from '../../dto/update-product.dto'
import { FullProduct } from '../../models/product.model'
import { StoreProduct } from '../../models/store-product.model'
import { createProductQuery } from '../../queries/create-product.query'
import { createStoreProductQuery } from '../../queries/create-store-product.query'
import { deleteStoreProductQuery } from '../../queries/delete-store-product.query'
import { findFullProductByUpcQuery } from '../../queries/find-full-product-by-upc.query'
import { findFullProductsQuery } from '../../queries/find-full-products.query'
import { findStoreProductByUpcQuery } from '../../queries/find-store-product-by-upc.query'
import { updateProductQuery } from '../../queries/update-product.query'
import { updateStoreProductQuery } from '../../queries/update-store-product.query'

const createPromoProductUpc = (storeProductUpc: string) => {
  return 'P' + storeProductUpc.slice(1)
}

const createPromoProductPrice = (storeProductPrice: number) => {
  return storeProductPrice * 0.8
}

const createPromoForStoreProduct = async (
  storeProduct: StoreProduct
): Promise<StoreProduct> => {
  const promoUpc = createPromoProductUpc(storeProduct.upc)
  const promoPrice = createPromoProductPrice(storeProduct.price)

  const promoStoreProduct = await createStoreProductQuery.execute({
    upc: promoUpc,
    number: storeProduct.number,
    price: promoPrice,
    productId: storeProduct.productId,
    isPromotional: true
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

const deletePromoForStoreProduct = async (storeProduct: StoreProduct) => {
  if (!storeProduct.upcPromotional) return

  await deleteStoreProductQuery.execute(storeProduct.upcPromotional)
  return await updateStoreProductQuery.execute([
    storeProduct.upc,
    {
      ...storeProduct,
      upcPromotional: null
    }
  ])
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
    await createPromoForStoreProduct(storeProduct)
  }

  return await findFullProductByUpc(storeProduct.upc)
}

export const findAllFullProducts = (
  findProductsFilter: FindProductsFilterDto
) => findFullProductsQuery.execute(findProductsFilter)

export const findFullProductByUpc = (upc: string) =>
  findFullProductByUpcQuery.execute(upc)

export const updateProduct = async (
  upc: string,
  updateProductDto: UpdateProductDto
) => {
  const fullProductToUpdate = await findFullProductByUpc(upc)
  const storeProductToUpdate = await findStoreProductByUpcQuery.execute(upc)

  await updateProductQuery.execute([fullProductToUpdate.id, updateProductDto])
  const updatedStoreProduct = await updateStoreProductQuery.execute([
    fullProductToUpdate.upc,
    {
      number: updateProductDto.number,
      price: updateProductDto.price,
      productId: fullProductToUpdate.id,
      isPromotional: false,
      upcPromotional: updateProductDto.isPromo
        ? storeProductToUpdate.upcPromotional
        : null
    }
  ])

  if (fullProductToUpdate.isPromo !== updateProductDto.isPromo) {
    if (updateProductDto.isPromo) {
      await createPromoForStoreProduct(updatedStoreProduct)
    } else {
      await deletePromoForStoreProduct(storeProductToUpdate)
    }
  } else if (
    fullProductToUpdate.isPromo &&
    storeProductToUpdate.upcPromotional &&
    (fullProductToUpdate.number !== updateProductDto.number ||
      fullProductToUpdate.price !== updateProductDto.price)
  ) {
    await updateStoreProductQuery.execute([
      storeProductToUpdate.upcPromotional,
      {
        number: updateProductDto.number,
        price: createPromoProductPrice(updateProductDto.price),
        productId: fullProductToUpdate.id,
        isPromotional: true
      }
    ])
  }

  return await findFullProductByUpc(upc)
}
