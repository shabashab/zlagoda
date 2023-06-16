export type ProviderResult<T> = T | Promise<T>

export interface Provider<T> {
  get: () => ProviderResult<T | null>
  set: (value: T) => ProviderResult<T>
  reset: () => void
}
