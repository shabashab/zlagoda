import { NotFoundException } from '../exceptions/not-found.exception'
import { User } from '../models/user.model'
import { UserRaw } from '../models/user.model.raw'
import { rawUserTransformer } from '../transformers/raw-user.transformer'
import { defineQuery } from './define-query'

export const findUserByIdQuery = defineQuery<string, User, UserRaw>({
  query: 'SELECT * FROM "User" WHERE id_employee = $1',
  values: (input) => [input],
  transformResult: (result) => {
    if (result.rowCount === 0) {
      throw new NotFoundException(
        "User with given employee id hasn't been found"
      )
    }

    return rawUserTransformer.transform(result.rows[0])
  }
})
