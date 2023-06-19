import { NotFoundException } from '../exceptions/not-found.exception'
import { FullUser } from '../models/user.model'
import { FullUserRaw } from '../models/user.model.raw'
import { fullUserTransformer } from '../transformers/full-user.transformer'
import { defineQuery } from './define-query'

export const findFullUserByIdQuery = defineQuery<string, FullUser, FullUserRaw>(
  {
    query: `
      SELECT 
        u.id_employee,
        login,
        empl_surname,
        empl_name,
        empl_patronymic,
        empl_role,
        salary,
        date_of_birth,
        date_of_start,
        phone_number,
        city,
        street,
        zip_code
      FROM "User" u JOIN "Employee" e ON u.id_employee = e.id_employee 
      WHERE u.id_employee = $1
    `,
    values: (input) => [input],
    transformResult: (result) => {
      if (result.rowCount === 0) {
        throw new NotFoundException(
          "User with given employee id hasn't been found"
        )
      }

      return fullUserTransformer.transform(result.rows[0])
    }
  }
)
