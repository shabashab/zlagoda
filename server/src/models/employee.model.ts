import { PublicUser } from './user.model'

export interface Employee {
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

export type FullEmployee = Employee & {
  user: PublicUser | null
  totalSold: number
}
