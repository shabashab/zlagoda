const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const BASE64 = BASE62 + '+/'

export const decodeBase64Number = (base64String: string): number => {
  let result = 0

  for (let i = 0, len = base64String.length; i < len; i++) {
    const alphabetIndex = BASE64.indexOf(base64String[i])

    if (alphabetIndex < 0) {
      throw new Error('Not a base 64 string')
    }

    result *= 64
    result += alphabetIndex
  }

  return result
}

export const encodeBase64Number = (value: number): string => {
  const alen = BASE64.length
  let result = ''

  do {
    result = BASE64.charAt(value % alen) + result
    value = Math.floor(value / alen) - 1
  } while (value > -1)

  return result
}
