import { RouteLocationNormalized } from 'vue-router'
import JwtProvider from '../providers/jwt.provider'

export default async function beforeEach(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (JwtProvider.get()) {
    return {
      path: '/cabinet',
    }
  }
}
