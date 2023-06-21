import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/categories'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./get'),
    import('./post'),
    import('./id.patch'),
    import('./id.delete')
  ]
})
