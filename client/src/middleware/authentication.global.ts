import { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

export default async function beforeEach(to: RouteLocationNormalized) {
  if ('public' in to.meta && to.meta.public) {
    return
  }

  const authStore = useAuthStore()

  try {
    if (!authStore.loadedOnce) await authStore.fetchAuthentication()
  } catch (e) {
    //Ignore
  }

  if (authStore.isAuthenticated) {
    return
  }

  return {
    path: '/auth/login',
  }
}
