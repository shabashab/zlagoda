import { CreateCustomerCardDto } from '../dto/create-customer-card.dto'
import { CustomerCard } from '../models/customer-card.model'
import { CustomerCardRaw } from '../models/customer-card.model.raw'
import { customerCardTransformer } from '../transformers/customer-card.transformer'
import { defineQuery } from './define-query'

export const createCustomerQuery = defineQuery<
  CreateCustomerCardDto,
  CustomerCard,
  CustomerCardRaw
>({
  query: `
    INSERT INTO "Customer_Card" (
      "card_number",
      "cust_surname",
      "cust_name",
      "cust_patronymic",
      "phone_number",
      "city",
      "street",
      "zip_code",
      "percent"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) RETURNING *
  `,
  values: (input) => [
    input.cardNumber,
    input.surname,
    input.name,
    input.patronymic ?? null,
    input.phoneNumber,
    input.city ?? null,
    input.street ?? null,
    input.zipCode ?? null,
    input.percent
  ],
  transformResult: (result) => {
    return customerCardTransformer.transform(result.rows[0])
  }
})
