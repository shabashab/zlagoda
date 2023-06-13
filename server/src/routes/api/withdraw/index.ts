import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/withdraw'

export const plugin = createPluginFromConfiguration({
  routes: [import('./post')]
})
