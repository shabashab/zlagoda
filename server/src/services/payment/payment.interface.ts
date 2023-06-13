export interface CoinpaymentsCredentials {
  key: string
  secret: string
}

export interface CreateTransaction {
  currency1: string
  currency2: string
  amount: number
  buyer_email: string
  address?: string
  buyer_name?: string
  item_name?: string
  item_number?: string
  invoice?: string
  custom?: string
  ipn_url?: string
  success_url?: string
  cancel_url?: string
}

export interface CoinPaymentsIPN {
  status: string
  status_text: string
  txn_id: string
  currency1: string
  currency2: string
  amount1: string
  amount2: string
  fee: string
  ipn_type: string
  buyer_name?: string
  email?: string
  item_name?: string
  item_number?: string
  invoice?: string
  custom?: string
  send_tx?: string
  received_amount?: string
  received_confirms?: string
}
