export interface Employee {
  id: string
  name: string
  surname: string
  patronymic?: string
  role: 'cashier' | 'admin'
  salary: number
  dateOfBirth: Date
  dateOfStart: Date
  phoneNumber: string
  city: string
  street: string
  zipCode: string
  imgUrl?: string
}
