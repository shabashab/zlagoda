export interface CreateEmployeeDto {
  employeeId: string
  surname: string
  name: string
  patronymic?: string
  role: 'cashier' | 'manager'
  salary: number
  birthDate: Date
  startDate: Date
  phoneNumber: string
  city: string
  street: string
  zipCode: string
}

export type CreateEmployeeDtoRaw = Omit<
  CreateEmployeeDto,
  'birthDate' | 'startDate'
> & {
  birthDate: string
  startDate: string
}
