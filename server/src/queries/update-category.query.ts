import { UpdateCategoryDto } from '../dto/update-category.dto'
import { Category } from '../models/category.model'
import { CategoryRaw } from '../models/category.model.raw'
import { categoryTransformer } from '../transformers/category.transformer'
import { defineQuery } from './define-query'

export const updateCategoryQuery = defineQuery<
  [number, UpdateCategoryDto],
  Category,
  CategoryRaw
>({
  query: `
    UPDATE "Category" SET 
      "category_name" = $2
    WHERE "category_number" = $1 
    RETURNING *
  `,
  values: (input) => [input[0], input[1].name],
  transformResult: (result) => categoryTransformer.transform(result.rows[0])
})
