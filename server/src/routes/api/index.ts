import { createPluginFromConfiguration } from '../../helpers/createPluginFromConfiguration'

export const prefix = '/api'

export const plugin = createPluginFromConfiguration({
  routes: [import('./contact-form.post')],
  plugins: [
    import('./auth'),
    import('./box'),
    import('./purchase'),
    import('./admin'),
    import('./withdraw'),
    import('./balance'),
    import('./ipn'),
    import('./transactions'),
    import('./box-purchases'),
    import('./profile'),
    import('./activity')
  ]
})
