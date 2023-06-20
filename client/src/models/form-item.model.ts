export interface FormItem {
  key: string
  label: string
  type: 'string' | 'number' | 'Date' | 'role'
  error?: boolean
}
