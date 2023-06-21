import { Check } from '../models/check.model'
import { CheckRaw } from '../models/check.model.raw'
import { Transformer, createTransformer } from './transformer'

export const checkTransformer: Transformer<CheckRaw, Check> =
  createTransformer<CheckRaw>()
    .map('check_number', 'id')
    .map('id_employee', 'employeeId')
    .map('card_number', 'customerId')
    .mapTransformed('print_date', 'printDate', (value) => new Date(value))
    .mapTransformed('sum_total', 'totalSum', parseFloat)
    .mapTransformed('vat', 'vat', parseFloat)
