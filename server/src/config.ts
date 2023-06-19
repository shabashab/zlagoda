import { env, envNumber } from './env'

export const PORT = envNumber('PORT', 4000)
export const DATABASE_URL = env('DATABASE_URL')
export const JWT_SECRET = env('JWT_SECRET')
