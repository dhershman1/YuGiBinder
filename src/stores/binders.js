import axiosNoAuth from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthDependencies } from '@/composables/auth'

export const useBindersStore = defineStore('binders', () => {
  const binders = ref([])
  const currentBinder = ref(null)
  const thumbnails = ref([])

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
    const response = await axiosNoAuth(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const apiResponse = response.data

    if (apiResponse.error) {
      if (apiResponse.error === 'Binder not found') {
      }

      return apiResponse
    }

    currentBinder.value = apiResponse
  }

  async function retrieveRandomBinder() {
    const response = await axiosNoAuth('/api/binders/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    currentBinder.value = response.data
  }

  async function createBinder(binder) {
    const { axios } = await useAuthDependencies()
    const response = await axios.post('/api/binders/create', binder)

    return response.data
  }

  async function deleteBinder(id) {
    const { axios } = await useAuthDependencies()
    const response = await axios.delete(`/api/binders/${id}`)

    return response.data
  }

  async function retrieveBinderThumbnails() {
    const response = await axiosNoAuth('/api/binders/thumbnails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    thumbnails.value = response.data

    return thumbnails.value
  }

  return {
    binders,
    createBinder,
    currentBinder,
    deleteBinder,
    retrieveBinders,
    retrieveRandomBinder,
    retrieveBinderById,
    retrieveBinderThumbnails,
    thumbnails
  }
})
