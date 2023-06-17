export const rethrowException = <T>(func: () => T, exception: Error): T => {
  try {
    return func()
  } catch (e) {
    throw exception
  }
}

export const rethrowExceptionAsync = async <T>(
  func: () => Promise<T>,
  exception: Error
): Promise<T> => {
  try {
    return await func()
  } catch (e) {
    throw exception
  }
}
