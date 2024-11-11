import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaginationStore = defineStore('pagination', () => {
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)

  function setPaginationData(data) {
    currentPage.value = data.currentPage
    totalPages.value = data.totalPages
    totalItems.value = data.totalRecords
  }

  return {
    currentPage,
    totalPages,
    totalItems,
    setPaginationData
  }
})
