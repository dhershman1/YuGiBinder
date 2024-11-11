import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardsStore = defineStore('cards', () => {
  const topCards = ref([])
  const currentCard = ref({})
  const cards = ref([])
  const cardsInBinder = ref([])

  async function retrieveCards(params) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/cards?${queryString}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    return data
  }

  async function retrieveTopCards() {
    if (topCards.value.length > 0) {
      return topCards.value
    }

    const response = await fetch('/api/cards/top', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    topCards.value = data
    return data
  }

  async function retrieveRandomCard() {
    const response = await fetch('/api/cards/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    currentCard.value = data
    return data
  }

  async function retrieveCardById(id) {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    currentCard.value = data
    return data
  }

  async function retrieveCardsInBinder(binderId, params) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/binders/${binderId}/cards?${queryString}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

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
