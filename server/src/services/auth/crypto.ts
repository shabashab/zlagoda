import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export const verifyPassword = async (
  password: string,
  passwordHashed: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHashed)
}
