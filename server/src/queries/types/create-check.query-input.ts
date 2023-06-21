export interface CreateCheckQueryInput {
  id: string
  employeeId: string
  customerId?: string
  printDate: Date
  totalSum: number
  vat: number
}
