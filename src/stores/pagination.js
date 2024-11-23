import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaginationStore = defineStore('pagination', () => {
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(10)

  function setPaginationData(data) {
    currentPage.value = Number(data.currentPage)
    totalPages.value = Number(data.totalPages)
    totalItems.value = Number(data.totalRecords)
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    setPaginationData
  }
})
