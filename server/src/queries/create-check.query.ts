import { Check } from '../models/check.model'
import { CheckRaw } from '../models/check.model.raw'
import { checkTransformer } from '../transformers/check.transformer'
import { defineQuery } from './define-query'
import { CreateCheckQueryInput } from './types/create-check.query-input'

export const createCheckQuery = defineQuery<
  CreateCheckQueryInput,
  Check,
  CheckRaw
>({
  query: `
    INSERT INTO "Check" (
      "check_number",
      "id_employee",
      "card_number",
      "print_date",
      "sum_total",
      "vat"
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    ) RETURNING *
  `,
  values: (input) => [
    input.id,
    input.employeeId,
    input.customerId ?? null,
    input.printDate,
    input.totalSum,
    input.vat
  ],
  transformResult: (result) => checkTransformer.transform(result.rows[0])
})
