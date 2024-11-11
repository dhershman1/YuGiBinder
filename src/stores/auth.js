import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const user = ref(null)

  async function login(details) {
    const response = await axios.post('/api/login', details, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
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
    token.value = ''
    user.value = null

    await axios({
      method: 'POST',
      url: '/api/logout',
      withCredentials: true
    })
  }

  async function checkToken() {
    if (token.value) {
      const decodedToken = jwtDecode(token.value)

      user.value = decodedToken

      return true
    }

    const { data } = await axios.post(
      '/api/refresh',
      {},
      {
        withCredentials: true
      }
    )

    const decoded = jwtDecode(data.token)

    user.value = decoded
    token.value = data.token
  }

  return {
    checkToken,
    login,
    logout,
    register,
    token,
    user
  }
})
