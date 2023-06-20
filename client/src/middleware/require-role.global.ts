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
    if (to.meta.role === authStore.currentUser?.role) {
      return
    }

    return authStore.currentUser!.role === 'manager'
      ? {
        path: '/cabinet/admin/customers',
      }
      : {
        path: '/cabinet/cashier',
      }
  }

  return {
    path: '/auth/login',
  }
}
