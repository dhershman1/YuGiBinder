import { defineStore } from 'pinia'
import { isBefore } from 'date-fns'
import { ref } from 'vue'
import { Auth0 } from '@/configs/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userId = ref(null)
  const accessTokenExpiry = ref(null)
  const accessToken = ref(null)

  async function getProfile() {
    const currentUser = Auth0.user.value

    if (currentUser) {
      userId.value = currentUser.sub

      return currentUser
    } else {
      await checkToken()

      const newUser = Auth0.user.value
      userId.value = newUser.sub

      return newUser
    }
  }

  async function checkToken() {
    if (accessToken.value && accessTokenExpiry.value) {
      const willExpireSoon = isBefore(accessTokenExpiry.value, Date.now() + 30)

      if (!willExpireSoon) {
        return {
          accessToken: accessToken.value,
          accessTokenExpiry: accessTokenExpiry.value,
          fromCache: true
        }
      }
    }

    const tokenResponse = await Auth0.getAccessTokenSilently({ detailedResponse: true })

    accessToken.value = tokenResponse.access_token
    accessTokenExpiry.value = Date.now() + tokenResponse.expires_in * 1000

    getProfile()

    return {
      accessToken: accessToken.value,
      accessTokenExpiry: accessTokenExpiry.value,
      fromCache: false
    }
  }

  return {
    accessToken,
    accessTokenExpiry,
    checkToken,
    getProfile,
    user,
    userId
  }
})
