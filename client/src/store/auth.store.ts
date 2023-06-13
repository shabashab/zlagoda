import { SignInDto } from '../api/dto/sign-in.dto'
import { createEventEmitter } from '../helpers/event-emitter'
import JwtProvider from '../providers/jwt.provider'

export const useAuthStore = defineStore('auth', () => {
  const {
    fetch: fetchUser,
    loading: currentUserLoading,
    result: currentUser,
  } = auth.useUser()

  const {
    fetch: fetchSignIn,
    loading: signInLoading,
    error: signInError,
  } = auth.useSignIn()

  const loadedOnce = ref(false)
  const isAuthenticated = computed(() => !!currentUser.value)
  const onSignOut = createEventEmitter()

  const fetchAuthentication = async () => {
    if (JwtProvider.get()) {
      try {
        await fetchUser()
      } catch (e) {
        JwtProvider.reset()
      }
    }

    loadedOnce.value = true
  }

  const signIn = async (signInDto: SignInDto) => {
    const { token } = await fetchSignIn(signInDto)
    JwtProvider.set(token)

    currentUser.value = await fetchUser()
  }

  const signOut = async () => {
    if (!isAuthenticated.value) return

    JwtProvider.reset()
    onSignOut.emit()
    location.replace('/')
  }

  return {
    isAuthenticated,
    loadedOnce,
    fetchAuthentication,

    currentUserLoading,
    currentUser,

    signIn,
    signInLoading,
    signInError,
    signOut,
  }
})
