import { NotFoundException } from '../exceptions/not-found.exception'
import { FullEmployee } from '../models/employee.model'
import { FullEmployeeRaw } from '../models/full-employee.model.raw'
import { fullEmployeeTransformer } from '../transformers/full-employee.transformer'
import { defineQuery } from './define-query'

export const findFullEmployeeByIdQuery = defineQuery<
  string,
  FullEmployee,
  FullEmployeeRaw
>({
  query: `
    SELECT e.id_employee,
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
      zip_code,
      SUM("sum_total") as "sold_total"
      FROM "Employee" e
        LEFT JOIN "Check" c ON c."id_employee" = e."id_employee"
        LEFT JOIN "User" u ON u."id_employee" = e."id_employee"
      WHERE e.id_employee = $1
      GROUP BY e.id_employee,
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
    `,
  values: (input) => [input],
  transformResult: (result) => {
    if (result.rowCount === 0) {
      throw new NotFoundException(
        "Employee with given employee id hasn't been found"
      )
    }

    return fullEmployeeTransformer.transform(result.rows[0])
  }
})
