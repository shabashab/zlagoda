import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify'

export const createPluginWithOptionsCallback = <OptT extends object>(
  pluginCallback: FastifyPluginCallback<OptT>,
  options: OptT
): FastifyPluginAsync<{}> => {
  return async (fastify) => {
    fastify.register(pluginCallback, options)
  }
}
