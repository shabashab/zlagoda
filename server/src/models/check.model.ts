import { Employee } from './employee.model'

export interface Check {
  id: string
  employeeId: string
  customerId?: string | null
  printDate: Date
  totalSum: number
  vat: number
}

export type CheckWithCashier = Check & {
  cashier: Employee
}
