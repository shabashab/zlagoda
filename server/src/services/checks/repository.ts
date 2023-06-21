import { CreateCheckDto } from '../../dto/create-check.dto'
import { CreateSaleDto } from '../../dto/create-sale.dto'
import { ConflictException } from '../../exceptions/conflict-exception'
import { Check } from '../../models/check.model'
import { FullProduct } from '../../models/product.model'
import { createCheckQuery } from '../../queries/create-check.query'
import { createSaleQuery } from '../../queries/create-sale.query'
import { findCustomerCardByIdQuery } from '../../queries/find-customer-card-by-id.query'
import { findFullProductsByIdsQuery } from '../../queries/find-full-products-by-ids.query'
import { updateProduct } from '../products/repository'

type UpcFullProductMap = Map<string, FullProduct>

const CHECK_ID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const CHECK_ID_CHARACTERS_LENGTH = CHECK_ID_CHARACTERS.length
const CHECK_ID_LENGTH = 10

const generateCheckId = () => {
  let result = ''

  let counter = 0
  while (counter < CHECK_ID_LENGTH) {
    result += CHECK_ID_CHARACTERS.charAt(
      Math.floor(Math.random() * CHECK_ID_CHARACTERS_LENGTH)
    )
    counter += 1
  }

  return result
}

const createUpcFullProductMap = (
  products: FullProduct[]
): UpcFullProductMap => {
  const result = new Map<string, FullProduct>()

  for (const product of products) {
    result.set(product.upc, product)
  }

  return result
}

const validateProductsCountOrThrow = (
  createCheckDto: CreateCheckDto,
  productsMap: UpcFullProductMap
) => {
  for (const checkEntry of createCheckDto.entries) {
    const productCount = productsMap.get(checkEntry.upc)?.number

    if (typeof productCount !== 'number') {
      throw new Error('Invalid product map')
    }

    if (productCount < checkEntry.number) {
      throw new ConflictException('Not enough items in the shop')
    }
  }
}

export const createCheck = async (
  createCheckDto: CreateCheckDto,
  employeeId: string
): Promise<Check> => {
  const upcs = createCheckDto.entries.map((value) => value.upc)
  const products = await findFullProductsByIdsQuery.execute(upcs)
  const productsMap = createUpcFullProductMap(products)

  validateProductsCountOrThrow(createCheckDto, productsMap)

  const customerCard = createCheckDto.customerId
    ? await findCustomerCardByIdQuery.execute(createCheckDto.customerId)
    : undefined
  const personalDiscountCoefficient = customerCard
    ? 1 + customerCard.percent / 100
    : 1

  let rawSum = 0
  const salesToCreate: Omit<CreateSaleDto, 'checkId'>[] = []

  for (const checkEntry of createCheckDto.entries) {
    const entryProduct = productsMap.get(checkEntry.upc)

    if (!entryProduct) continue

    salesToCreate.push({
      upc: checkEntry.upc,
      productNumber: checkEntry.number,
      productPrice: entryProduct.price
    })

    rawSum +=
      (entryProduct.isPromo && entryProduct.promoPrice
        ? entryProduct.promoPrice
        : entryProduct.price) * personalDiscountCoefficient
  }

  const check = await createCheckQuery.execute({
    customerId: createCheckDto.customerId,
    employeeId,
    id: generateCheckId(),
    printDate: new Date(),
    totalSum: rawSum * 1.2,
    vat: rawSum * 0.2
  })

  for (const saleToCreate of salesToCreate) {
    const product = productsMap.get(saleToCreate.upc)

    if (!product) continue

    await updateProduct(saleToCreate.upc, {
      ...product,
      number: product.number - saleToCreate.productNumber
    })

    const productPrice =
      (product.isPromo && product.promoPrice
        ? product.promoPrice
        : product.price) * personalDiscountCoefficient

    await createSaleQuery.execute({
      checkId: check.id,
      productNumber: saleToCreate.productNumber,
      productPrice,
      upc: saleToCreate.upc
    })
  }

  return check
}
