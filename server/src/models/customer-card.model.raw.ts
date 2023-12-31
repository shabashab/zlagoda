export interface CustomerCardRaw {
  card_number: string
  cust_surname: string
  cust_name: string
  cust_patronymic?: string
  phone_number: string
  city?: string
  street?: string
  zip_code?: string
  percent: number
  avg_products_per_check: string | null
  purchased_total: string | null
}
