import { RouteOptions } from 'fastify'
import { sendEmail } from '../../services/email'

export const options: RouteOptions = {
  method: 'POST',
  url: '/contact-form',
  handler: async (req) => {
    const body = req.body as {
      email: string
      firstName: string
      lastName: string
      phoneNumber: string
      telegramId: string
    }

    await sendEmail(
      'support@monfi.io',
      'Contact form submission',
      `
        <p><b>E-mail:</b>: ${body.email}</p>
        <p><b>First name:</b>: ${body.firstName}</p>
        <p><b>Last name:</b>: ${body.lastName}</p>
        <p><b>Phone number:</b>: ${body.phoneNumber}</p>
        <p><b>Telegram id:</b>: ${body.telegramId}</p>
      `
    )

    return {
      message: 'Successfull form submission'
    }
  }
}
