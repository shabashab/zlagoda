import { Provider } from './provider.interface'

const JWT_LOCAL_STORAGE_KEY = 'jwt'

const JwtProvider: Provider<string> = {
  get() {
    return localStorage.getItem(JWT_LOCAL_STORAGE_KEY)
  },
  set(value) {
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, value)
    return value
  },
  reset() {
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY)
  },
}

export default JwtProvider
