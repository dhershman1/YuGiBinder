import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthDependencies } from '@/composables/auth'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref([])

  async function retrieveTags() {
    const { axios } = await useAuthDependencies()
    const response = await axios.get('/api/tags')

    tags.value = response.data
  }

  return {
    retrieveTags,
    tags
  }
})
