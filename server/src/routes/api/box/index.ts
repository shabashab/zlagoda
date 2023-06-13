import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/box'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get'), import('./post')]
})
