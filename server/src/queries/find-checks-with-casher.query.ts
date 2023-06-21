import { CheckWithCashier } from '../models/check.model'
import { CheckWithCashierRaw } from '../models/check.model.raw'
import { checkWithCashierTransformer } from '../transformers/check-with-cashier.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findChecksWithCashierQuery = defineQuery<
  void,
  CheckWithCashier[],
  CheckWithCashierRaw
>({
  query: `
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
    ORDER BY "print_date" DESC
  `,
  transformResult: (result) => {
    return transformQueryResult(checkWithCashierTransformer, result)
  }
})
