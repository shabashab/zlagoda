import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/api'

export const plugin = createPluginFromConfiguration({
  plugins: [
    import('./auth'),
    import('./employees'),
    import('./customers'),
    import('./categories'),
    import('./products')
  ]
})
