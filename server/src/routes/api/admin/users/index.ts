import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/users'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get'), import('./id.get')]
})
