import { CreateCategoryDto } from '../dto/create-category.dto'
import { Category } from '../models/category.model'
import { CategoryRaw } from '../models/category.model.raw'
import { categoryTransformer } from '../transformers/category.transformer'
import { defineQuery } from './define-query'

export const createCategoryQuery = defineQuery<
  CreateCategoryDto,
  Category,
  CategoryRaw
>({
  query: `
    INSERT INTO "Category" (
      "category_name"
    ) VALUES (
      $1
    ) RETURNING *
  `,
  values: (input) => [input.name],
  transformResult: (result) => {
    return categoryTransformer.transform(result.rows[0])
  }
})
