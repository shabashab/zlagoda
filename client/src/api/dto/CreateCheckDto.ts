export interface CreateCheckDto {
  customerId?: string
  entries: {
    upc: string
    number: number
  }[]
}
