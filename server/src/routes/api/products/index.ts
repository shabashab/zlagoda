import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/products'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./post'),
    import('./get'),
    import('./upc.get'),
    import('./upc.patch')
  ]
})
