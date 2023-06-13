import { createTransport, Transporter } from 'nodemailer'

const getTransporter = (() => {
  let transporter: null | Transporter

  return (): Transporter => {
    if (!transporter) {
      transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? +process.env.SMTP_PORT : 465,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
    }

    return transporter
  }
})()

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = getTransporter()

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html: text
  })
}
