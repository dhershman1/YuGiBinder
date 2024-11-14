import { useAuthStore } from '@/stores/auth'
import { createAxiosAuthInstance } from '@/configs/auth'

export const useAuthDependencies = async () => {
  const authStore = useAuthStore()

  const { accessToken } = await authStore.checkToken()

  const axios = createAxiosAuthInstance(accessToken)

  return { axios }
}
