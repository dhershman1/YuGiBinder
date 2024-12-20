import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaginationStore } from './pagination'
import axiosNoAuth from 'axios'

const MAX_CARDS_IN_BINDERS = 50

function findNextOpenSlot(arr) {
  return arr.findIndex((card) => card.placeholder)
}

export const useCardsStore = defineStore('cards', () => {
  const paginationStore = usePaginationStore()
  const topCards = ref([])
  const currentCard = ref({})
  const cards = ref([])
  const cardsInBinder = ref(
    Array.from({ length: MAX_CARDS_IN_BINDERS }, (_, idx) => {
      return {
        id: idx + 1,
        position: idx,
        placeholder: true
      }
    })
  )

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
    paginationStore.setPaginationData(data.pagination)

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
    const PER_PAGE = 10

    paginationStore.setPaginationData({
      currentPage: 1,
      totalPages: Math.ceil(MAX_CARDS_IN_BINDERS / PER_PAGE),
      totalRecords: MAX_CARDS_IN_BINDERS
    })
    paginationStore.itemsPerPage = PER_PAGE

    for (let i = 0; i < data.length; i++) {
      const pos = data[i].position ?? findNextOpenSlot(cardsInBinder.value)

      data[i].position = pos

      cardsInBinder.value[pos] = data[i]
    }

    return cardsInBinder.value
  }

  async function moveCards(cards) {
    const { data } = await axiosNoAuth('/api/cards/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: cards
    })

    return data
  }

  return {
    cards,
    cardsInBinder,
    currentCard,
    moveCards,
    retrieveCards,
    retrieveCardById,
    retrieveCardsInBinder,
    retrieveRandomCard,
    retrieveTopCards,
    topCards
  }
})
