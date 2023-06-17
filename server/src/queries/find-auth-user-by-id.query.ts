import { NotFoundException } from '../exceptions/not-found.exception'
import { AuthUser } from '../models/user.model'
import { AuthUserRaw } from '../models/user.model.raw'
import { authUserTransformer } from '../transformers/auth-user.transformer'
import { defineQuery } from './define-query'

export const findAuthUserByIdQuery = defineQuery<string, AuthUser, AuthUserRaw>(
  {
    query: `
    SELECT id_employee, login, empl_role 
    FROM "User" u JOIN "Employee" e ON u.id_employee = e.id_employee 
    WHERE id_employee = 1
  `,
    values: (input) => [input],
    transformResult: (result) => {
      if (result.rowCount === 0) {
        throw new NotFoundException(
          "User with given employee id hasn't been found"
        )
      }

      return authUserTransformer.transform(result.rows[0])
    }
  }
)
