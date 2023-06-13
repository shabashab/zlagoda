import { env, envNumber } from './env'

export const PORT = envNumber('PORT', 4000)
export const JWT_SECRET = env('JWT_SECRET')

export const REDIS_IP_FAMILY = envNumber('REDIS_IP_FAMILY', 4)
export const REDIS_URL = env('REDIS_URL')

export const BULL_DASHBOARD_PORT = envNumber('BULL_DASHBOARD_PORT', 4001)
export const BULL_DASHBOARD_HOST = env('BULL_DASHBOARD_HOST', '0.0.0.0')

export const COINPAYMENT_KEY = env('COINPAYMENTS_KEY')
export const COINPAYMENT_SECRET = env('COINPAYMENTS_SECRET')
