import { RouteLocationNormalized } from 'vue-router'

export default function beforeEach(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (to.path.length <= 1) {
    return {
      path: '/admin',
    }
  }

  return
}
