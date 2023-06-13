import { FastifyRequest } from 'fastify'

export const getRequestClientIp = (req: FastifyRequest): string => {
  const flyIpHeaderValue = req.headers['Fly-Client-IP']

  if (flyIpHeaderValue && typeof flyIpHeaderValue === 'string') {
    return flyIpHeaderValue
  }

  return req.ip
}
