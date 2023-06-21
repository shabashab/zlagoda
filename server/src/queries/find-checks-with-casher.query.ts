import { ChecksFilter } from '../dto/checks-filter.dto'
import { CheckWithCashier } from '../models/check.model'
import { CheckWithCashierRaw } from '../models/check.model.raw'
import { checkWithCashierTransformer } from '../transformers/check-with-cashier.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findChecksWithCashierQuery = defineQuery<
  ChecksFilter,
  CheckWithCashier[],
  CheckWithCashierRaw
>({
  query: (input) => {
    const queryBase = `
      SELECT 
        empl."id_employee",
        "empl_surname",
        "empl_name",
        "empl_patronymic",
        "empl_role",
        "salary",
        "date_of_birth",
        "date_of_start",
        "phone_number",
        "city",
        "street",
        "zip_code",
        "check_number",
        "card_number",
        "print_date",
        "sum_total",
        "vat"
      FROM "Check" c 
      JOIN "Employee" empl ON c."id_employee" = empl."id_employee"
      
    `

    const conditions = []
    let paramIndex = 1

    if (input.from) {
      conditions.push(`"print_date" > $${paramIndex}`)
      paramIndex++
    }

    if (input.to) {
      conditions.push(`"print_date" < $${paramIndex}`)
      paramIndex++
    }

    if (input.employeeId) {
      conditions.push(`c."id_employee" = $${paramIndex}`)
      paramIndex++
    }

    const conditionsString = `WHERE ${conditions.join(' AND ')}`

    const query = `${queryBase}${
      conditions.length > 0 ? conditionsString : ''
    } ORDER BY "print_date" DESC`
    globalThis.logger.info(query)
    return query
  },
  values: (input) => {
    const result = []

    if (input.from) result.push(input.from)
    if (input.to) result.push(input.to)
    if (input.employeeId) result.push(input.employeeId)

    return result
  },
  transformResult: (result) => {
    return transformQueryResult(checkWithCashierTransformer, result)
  }
})
