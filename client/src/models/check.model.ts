import { CustomerCard } from './customer-card.model'
import { Employee } from './employee.model'
import { Product } from './product.model'
export interface Check {
  id?: string
  cashier: Employee
  items: {
    product: Product
    number: number
  }[]
  customerCard?: CustomerCard
  printDate: Date
  totalSum: number
  vat: number
}
