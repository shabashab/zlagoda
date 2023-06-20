import { CreateCustomerCardDto } from './create-customer-card.dto'

export type UpdateCustomerCardDto = Omit<CreateCustomerCardDto, 'cardNumber'>
