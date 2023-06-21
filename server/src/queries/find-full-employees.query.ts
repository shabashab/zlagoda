import { FullEmployee } from '../models/employee.model'
import { FullEmployeeRaw } from '../models/full-employee.model.raw'
import { fullEmployeeTransformer } from '../transformers/full-employee.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'
import { FindEmployeeQueryInput } from './types/find-employee.query-input'

export const findEmployeesQuery = defineQuery<
  FindEmployeeQueryInput,
  FullEmployee[],
  FullEmployeeRaw
>({
  query: (input) => {
    const queryBase = `
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
    `

    const queryGroupBy = `
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
    `

    let queryConditions = ''

    if (input.role || input.surname) {
      let paramId = 1

      const conditions: string[] = []

      if (input.role) {
        conditions.push(`"empl_role" = $${paramId}`)
        paramId++
      }

      if (input.surname) {
        conditions.push(`"empl_surname" = $${paramId}`)
      }

      queryConditions += ` WHERE ${conditions.join(' AND ')}`
    }

    return queryBase + queryConditions + queryGroupBy
  },
  values: (input) => {
    const result = []

    if (input.role) result.push(input.role)
    if (input.surname) result.push(input.surname)

    return result
  },
  transformResult: (result) => {
    return transformQueryResult(fullEmployeeTransformer, result)
  }
})
