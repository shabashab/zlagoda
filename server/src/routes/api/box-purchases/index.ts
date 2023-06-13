import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/box-purchases'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get')]
})
