import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'
import formBody from '@fastify/formbody'

export const prefix = '/ipn'

export const plugin = createPluginFromConfiguration({
  routes: [import('./post')],
  extend: async (fastify) => {
    fastify.register(formBody)
  }
})
