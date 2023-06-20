import { CreateCustomerCardDto } from '../../dto/create-customer-card.dto'
import { UpdateCustomerCardDto } from '../../dto/update-customer-card.dto'
import { createCustomerQuery } from '../../queries/create-customer-card.query'
import { findCustomerCardByIdQuery } from '../../queries/find-customer-card-by-id.query'
import { findCustomerCardsQuery } from '../../queries/find-customer-cards.query'
import { updateCustomerCard } from '../../queries/update-customer-card.query'

export const findAllCustomers = () => findCustomerCardsQuery.execute()
export const findCustomerById = (id: string) =>
  findCustomerCardByIdQuery.execute(id)
export const createCustomer = (createCustomerDto: CreateCustomerCardDto) =>
  createCustomerQuery.execute(createCustomerDto)
export const updateCustomerById = (
  id: string,
  updateCustomerDto: UpdateCustomerCardDto
) => updateCustomerCard.execute([id, updateCustomerDto])
