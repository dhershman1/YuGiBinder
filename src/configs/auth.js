import { createAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'

export const Auth0 = createAuth0({
  domain: import.meta.env.VITE_VUE_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_VUE_APP_AUTH0_CLIENT_ID,
  // useRefreshTokens: true,
  cacheLocation: 'localstorage',
  authorizationParams: {
    // redirect_uri: `${window.location.origin}/callback`,
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_VUE_APP_AUTH0_AUDIENCE,
    scope: 'openid profile email user_metadata offline_access'
  }
})

export const createAxiosAuthInstance = (accessToken) => {
  const instance = axios.create()

  instance.interceptors.request.use((config) => {
    Object.assign(config.headers, {
      Authorization: `Bearer ${accessToken}`
    })

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async function (err) {
      const originalRequest = err.config
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const tokenResponse = await Auth0.getAccessTokenSilently({ ignoreCache: true })
        const newAccessToken = tokenResponse.accessToken

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return instance(originalRequest)
      }

      return Promise.reject(err)
    }
  )
  instance.interceptors.response.use()
  return instance
}
