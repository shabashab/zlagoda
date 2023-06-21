import { User } from './user.model'

export interface Employee {
  employeeId: string
  name: string
  surname: string
  patronymic?: string
  role: 'cashier' | 'manager'
  salary: number
  birthDate: Date
  startDate: Date
  phoneNumber: string
  city: string
  street: string
  zipCode: string
  imgUrl?: string
  soldTotal?: number
}

export type FullEmployee = Employee & {
  user: User | null
}
