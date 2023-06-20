export interface SignInDto {
  login: string
  password: string
  as: 'manager' | 'cashier'
}
