import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/:id/user'

export const plugin = createPluginFromConfiguration({
  routes: [import('./post')]
})
