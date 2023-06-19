import { createPluginFromConfiguration } from '../../../helpers/createPluginFromConfiguration'

export const prefix = '/employees'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get'), import('./id.get'), import('./post')]
})
