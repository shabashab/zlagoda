export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
export const API_BASE_URL = API_URL + '/api'
export const REQUEST_DELAY = import.meta.env.VITE_REQUEST_DELAY
  ? +import.meta.env.VITE_REQUEST_DELAY
  : undefined
