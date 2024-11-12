import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../axios'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref([])

  async function retrieveTags() {
    const response = await axios.get('/api/tags')

    tags.value = response.data
  }

  return {
    retrieveTags,
    tags
  }
})
