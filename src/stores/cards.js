import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaginationStore } from './pagination'
import axiosNoAuth from 'axios'

export const useCardsStore = defineStore('cards', () => {
  const pagination = usePaginationStore()
  const topCards = ref([])
  const currentCard = ref({})
  const cards = ref([])
  const cardsInBinder = ref([])

  async function retrieveCards(params) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/cards?${queryString}`

    const { data } = await axiosNoAuth(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    cards.value = data.results
    pagination.setPaginationData(data.pagination)

    return data.results
  }

  async function retrieveTopCards() {
    if (topCards.value.length > 0) {
      return topCards.value
    }

    const { data } = await axiosNoAuth('/api/cards/top', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    topCards.value = data
    return data
  }

  async function retrieveRandomCard(limit = 1) {
    const { data } = await axiosNoAuth('/api/cards/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        limit
      }
    })

    return data
  }

  async function retrieveCardById(id) {
    const { data } = await axiosNoAuth(`/api/cards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    currentCard.value = data
    return data
  }

  async function retrieveCardsInBinder(binderId, params) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/binders/${binderId}/cards?${queryString}`
    const { data } = await axiosNoAuth(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    cardsInBinder.value = data
    return data
  }

  return {
    cards,
    cardsInBinder,
    currentCard,
    retrieveCards,
    retrieveCardById,
    retrieveCardsInBinder,
    retrieveRandomCard,
    retrieveTopCards,
    topCards
  }
})
