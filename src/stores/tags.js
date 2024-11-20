import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthDependencies } from '@/composables/auth'
import axiosNoAuth from 'axios'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref([])
  const currentBinderTags = ref([])

  async function retrieveTags() {
    const { axios } = await useAuthDependencies()
    const response = await axios.get('/api/tags')

    tags.value = response.data
  }

  async function retrieveTagsForBinder(binderId) {
    const response = await axiosNoAuth(`/api/tags/${binderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    currentBinderTags.value = response.data

    return response.data
  }

  return {
    currentBinderTags,
    retrieveTags,
    retrieveTagsForBinder,
    tags
  }
})
