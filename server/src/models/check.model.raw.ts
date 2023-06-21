import { EmployeeRaw } from './employee.model.raw'

export interface CheckRaw {
  check_number: string
  id_employee: string
  card_number?: string | null

  print_date: string
  sum_total: string
  vat: string
}

export type CheckWithCashierRaw = CheckRaw & EmployeeRaw
