import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import axios from '../axios'

export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage('token', '')
  const user = ref(token.value ? jwtDecode(token.value) : null)

  function hasAccess(action) {
    if (!user.value) {
      return false
    }

    if (user.value.role === 'superadmin') {
      return true
    }

    return user.value.permissions.includes(action)
  }

  async function login(details) {
    const response = await axios.post('/api/login', details, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = response.data
    token.value = data.token

    const decodedToken = jwtDecode(data.token)
    user.value = decodedToken

    return data.token
  }

  async function register(details) {
    const response = await axios.post('/api/register', details, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = response.data
    token.value = data.token

    const decodedToken = jwtDecode(data.token)
    user.value = decodedToken

    return data.token
  }

  async function logout() {
    await axios({
      method: 'POST',
      url: '/api/logout'
    })

    token.value = ''
    user.value = null
  }

  async function checkToken() {
    const TOKEN_EXPIRATION_THRESHOLD = 10 * 60 // 10 minutes in seconds

    if (token.value) {
      const decodedToken = jwtDecode(token.value)
      const currentTime = Math.floor(Date.now() / 1000)

      // If the token has expired, log the user out
      // and return false
      if (decodedToken.exp - currentTime <= 0) {
        await logout()
        return false
      }

      // If the token is about to expire, refresh it
      if (decodedToken.exp - currentTime < TOKEN_EXPIRATION_THRESHOLD) {
        const { data } = await axios.post('/api/refresh')

        const decoded = jwtDecode(data.token)

        user.value = decoded
        token.value = data.token
      } else {
        user.value = decodedToken
      }

      return true
    }

    try {
      const { data } = await axios.post('/api/refresh')

      const decoded = jwtDecode(data.token)

      user.value = decoded
      token.value = data.token
    } catch {
      // We don't care what happens here
    }
  }

  return {
    checkToken,
    hasAccess,
    login,
    logout,
    register,
    token,
    user
  }
})
