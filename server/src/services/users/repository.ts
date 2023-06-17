import { findUserByIdQuery } from '../../queries/find-user-by-id.query'
import { findUserByLoginQuery } from '../../queries/find-user-by-login.query'
import { findAuthUserByIdQuery } from '../../queries/find-auth-user-by-id.query'
import { findFullUserByIdQuery } from '../../queries/find-full-user-by-id.query'
import { CreateUserDto } from '../../dto/create-user.dto'
import { encryptPassword } from '../auth/crypto'
import { createUserQuery } from '../../queries/create-user.query'

export const findUserById = (id: string) => findUserByIdQuery.execute(id)
export const findUserByLogin = (login: string) =>
  findUserByLoginQuery.execute(login)
export const findAuthUserById = (id: string) =>
  findAuthUserByIdQuery.execute(id)
export const findFullUserById = (id: string) =>
  findFullUserByIdQuery.execute(id)

export const createUser = async (createUserDto: CreateUserDto) => {
  const passwordHash = await encryptPassword(createUserDto.password)

  return await createUserQuery.execute({
    employeeId: createUserDto.employeeId,
    login: createUserDto.login,
    passwordHash
  })
}
