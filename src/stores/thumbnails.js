import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosNoAuth from 'axios'

export const useThumbnailsStore = defineStore('thumbnails', () => {
  // All of the thumbnails for binders
  const thumbnails = ref([])

  async function retrieveBinderThumbnails() {
    const response = await axiosNoAuth('/api/thumbnails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    thumbnails.value = response.data

    return thumbnails.value
  }
  return {
    retrieveBinderThumbnails,
    thumbnails
  }
})
