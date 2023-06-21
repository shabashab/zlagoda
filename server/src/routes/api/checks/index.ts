import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/checks'

export const plugin = createPluginFromConfiguration({
  routes: [import('./post'), import('./get'), import('./id.get')]
})
