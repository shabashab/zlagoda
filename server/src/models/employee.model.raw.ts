export interface EmployeeRaw {
  id_employee: string
  empl_surname: string
  empl_name: string
  empl_patronymic?: string
  empl_role: 'cashier' | 'manager'
  salary: number
  date_of_birth: Date
  date_of_start: Date
  phone_number: string
  city: string
  street: string
  zip_code: string
}
