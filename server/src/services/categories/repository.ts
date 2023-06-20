import { CreateCategoryDto } from '../../dto/create-category.dto'
import { Category } from '../../models/category.model'
import { createCategoryQuery } from '../../queries/create-category.query'
import { findCategoriesQuery } from '../../queries/find-categories.query'

export const createCategory = (
  createCategoryDto: CreateCategoryDto
): Promise<Category> => createCategoryQuery.execute(createCategoryDto)
export const findAllCategories = (): Promise<Category[]> =>
  findCategoriesQuery.execute()
