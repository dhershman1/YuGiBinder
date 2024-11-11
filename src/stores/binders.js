import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBindersStore = defineStore('binders', () => {
  const binders = ref([])
  const currentBinder = ref(null)

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

  async function retrieveBinderById(id) {
    const url = `/api/binders/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    currentBinder.value = await response.json()
  }

  async function retrieveRandomBinder() {
    const response = await fetch('/api/binders/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    currentBinder.value = await response.json()
  }

  return {
    binders,
    currentBinder,
    retrieveBinders,
    retrieveRandomBinder,
    retrieveBinderById
  }
})
