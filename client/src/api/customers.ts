import { omit } from 'lodash'
import { CustomerCard } from '../models/customer-card.model'

export const customers = {
  useCustomers: defineDataEndpoint<void, CustomerCard[]>({
    method: 'GET',
    url: 'customers',
    requireAuthentication: true,
  }),
  useCreateCustomer: defineActionEndpoint<CustomerCard, CustomerCard>({
    method: 'POST',
    url: 'customers',
    requireAuthentication: true,
    dataBuilder(inputData) {
      return inputData
    },
  }),
  useEditCustomer: defineActionEndpoint<CustomerCard, CustomerCard>({
    method: 'PATCH',
    url: (input) => {
      return `customers/${input.cardNumber}`
    },
    requireAuthentication: true,
    dataBuilder(inputData) {
      return omit(inputData, ['cardNumber'])
    },
  }),
  useDeleteCustomer: defineActionEndpoint<CustomerCard, CustomerCard>({
    method: 'DELETE',
    url: (input) => {
      return `customers/${input.cardNumber}`
    },
    requireAuthentication: true,
  }),
  useCustomer: defineDataEndpoint<string, CustomerCard>({
    method: 'GET',
    url: (input) => {
      return `customers/${input}`
    },
    requireAuthentication: true,
  }),
  useLovers: defineDataEndpoint<string, CustomerCard[]>({
    method: 'GET',
    url: 'customers/category-lovers',
    queryBuilder(inputData) {
      return {
        categoryId: inputData,
      }
    },
    requireAuthentication: true,
  }),
}
