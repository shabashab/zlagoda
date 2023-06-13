import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/auth'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./sign-in.post'),
    import('./sign-up.post'),
    import('./get'),
    import('./verify.post')
  ],
  plugins: [import('./two-factor'), import('./password-restore')]
})
