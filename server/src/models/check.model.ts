export interface Check {
  id: string
  employeeId: string
  customerId?: string | null
  printDate: Date
  totalSum: number
  vat: number
}
