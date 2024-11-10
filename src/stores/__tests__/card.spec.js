import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCardsStore } from '../cards'

describe('Cards Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCardsStore()
  })

  it('initializes with empty topCards and currentCard', () => {
    expect(store.topCards).toEqual([])
    expect(store.currentCard).toEqual({})
  })

  it('retrieves top cards from API', async () => {
    const mockData = [
      { id: 1, name: 'Card 1' },
      { id: 2, name: 'Card 2' }
    ]
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    )

    const result = await store.retrieveTopCards()
    expect(result).toEqual(mockData)
    expect(store.topCards).toEqual(mockData)
  })

  it('retrieves card by id from API', async () => {
    const mockData = { id: 1, name: 'Card 1' }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    )

    const result = await store.retrieveCardById(1)
    expect(result).toEqual(mockData)
    expect(store.currentCard).toEqual(mockData)
  })
})
