import type { AuthUser } from './models/user.model'

export {}

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyRequest {
    user?: AuthUser
  }
}

// declare global {
//   // eslint-disable-next-line no-var, no-unused-vars
//   namespace NodeJS {
//     interface ProcessEnv {
//       PORT: string
//       DATABASE_URL: string
//       JWT_SECRET: string
//       HASHIDS_SALT: string
//       SMTP_HOST: string
//       SMTP_PORT: string
//       SMTP_SECURE: string
//       SMTP_USER: string
//       SMTP_PASS: string
//       SMTP_FROM: string
//     }
//   }
// }

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number
  }
}
