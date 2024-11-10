import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBindersStore = defineStore('binders', () => {
  const binders = ref([])

  async function retrieveBinders(params) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/binders?${queryString}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    binders.value = await response.json()
  }

  return {
    binders,
    retrieveBinders
  }
})
