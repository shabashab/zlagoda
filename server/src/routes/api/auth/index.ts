import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/auth'

export const plugin = createPluginFromConfiguration({
  routes: [import('./sign-in.post'), import('./get')]
})
