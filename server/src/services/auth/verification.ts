import { User } from '@prisma/client'
import { HttpException } from '../../exceptions/http-exception'
import { sendEmail } from '../email'
import { signForUser, verifyAndResolveUser } from './jwt'

export const sendVerificationEmail = async (
  user: User,
  callbackUrl: string
) => {
  const verificationToken = signForUser(user, { expiresIn: '7d' })

  const url = new URL(callbackUrl)
  url.searchParams.set('verificationToken', verificationToken)

  await sendEmail(
    user.email,
    'Account verification',
    `Follow link to verify your account: ${url.toString()}\n<br>\n<i>Note: Link expires in a week</i>`
  )
}

export const verifyUser = async (verificationToken: string) => {
  const user = await verifyAndResolveUser(verificationToken)

  if (!user) throw new HttpException(400)

  await globalThis.prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      isVerified: true
    }
  })
}
