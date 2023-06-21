import { UpdateCustomerCardDto } from '../dto/update-customer-card.dto'
import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { customerCardTransformer } from '../transformers/customer-card.transformer'
import { defineQuery } from './define-query'

export const updateCustomerCard = defineQuery<
  [string, UpdateCustomerCardDto],
  CustomerCard,
  CustomerCardRaw
>({
  query: `
    UPDATE "Customer_Card" SET (
      "cust_surname",
      "cust_name",
      "cust_patronymic",
      "phone_number",
      "city",
      "street",
      "zip_code",
      "percent"
    ) = (
      $2, $3, $4, $5, $6, $7, $8, $9
    ) WHERE "card_number" = $1 
    RETURNING *
  `,
  values: (input) => [
    input[0],
    input[1].surname,
    input[1].name,
    input[1].patronymic ?? null,
    input[1].phoneNumber,
    input[1].city ?? null,
    input[1].street ?? null,
    input[1].zipCode ?? null,
    input[1].percent
  ],
  transformResult: (result) => {
    return customerCardTransformer.transform(result.rows[0])
  }
})
