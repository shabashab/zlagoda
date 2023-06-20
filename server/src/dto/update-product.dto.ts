import { CreateProductDto } from './create-product.dto'

export type UpdateProductDto = Omit<CreateProductDto, 'upc'>
