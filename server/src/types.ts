import { RouteOptions } from 'fastify'

export type Route = Omit<RouteOptions, 'url' | 'method'>
