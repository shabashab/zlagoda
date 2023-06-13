import { User } from '@prisma/client'
import { SignUpDto } from './types'
import { encryptPassword } from './crypto'
import { sendVerificationEmail } from './verification'
import {
  findUserExistsByEmail,
  findUserExistsById,
  findUserExistsBySignUpIpAddress
} from '@services/user/repository'
import { ConflictException } from '@exceptions/conflict-exception'

export const signUp = async (
  { callbackUrl, email, password, referalId }: SignUpDto,
  signUpIpAddress?: string
): Promise<User> => {
  email = email.toLowerCase()

  if (await findUserExistsByEmail(email)) {
    throw new ConflictException('emailUserAlreadyExists')
  }

  if (referalId && !(await findUserExistsById(referalId))) {
    referalId = undefined
  }

  let arbitrageBonusBan = false

  if (referalId && signUpIpAddress) {
    arbitrageBonusBan = await findUserExistsBySignUpIpAddress(signUpIpAddress)
  }

  const encryptedPassword = await encryptPassword(password)

  const user = await globalThis.prisma.user.create({
    data: {
      email,
      password: encryptedPassword,
      refererId: referalId,
      arbitrageBonusBan
    }
  })

  // await notifyRegister(user)
  await sendVerificationEmail(user, callbackUrl)

  return user
}
