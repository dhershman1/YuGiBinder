import axiosNoAuth from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthDependencies } from '@/composables/auth'

export const useBindersStore = defineStore('binders', () => {
  // A collection of binders to show on the page
  const binders = ref([])
  // The current binder that is being viewed
  const currentBinder = ref(null)
  // All of the binders that belong to the current user
  const currentUsersBinders = ref([])

  async function retrieveUsersBinders() {
    const { axios } = await useAuthDependencies()
    const response = await axios.get('/api/binders/mine')

    currentUsersBinders.value = response.data

    return currentUsersBinders.value
  }

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

  async function retrieveBinderById(id, full = 'no') {
    const url = `/api/binders/${id}`
    const response = await axiosNoAuth(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        full
      }
    })
    const apiResponse = response.data

    currentBinder.value = apiResponse

    return apiResponse
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

  async function addCardToBinder(cardId) {
    const { axios } = await useAuthDependencies()
    const response = await axios.post(`/api/binders/${currentBinder.value.id}/card/${cardId}`)

    return response.data
  }

  async function updateBinder(binder) {
    const { axios } = await useAuthDependencies()

    const response = await axios.put(`/api/binders/${binder.id}`, binder)

    return response.data
  }

  return {
    addCardToBinder,
    binders,
    createBinder,
    currentBinder,
    currentUsersBinders,
    deleteBinder,
    retrieveBinders,
    retrieveRandomBinder,
    retrieveBinderById,
    retrieveUsersBinders,
    updateBinder
  }
})
