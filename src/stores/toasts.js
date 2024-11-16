import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toasts', () => {
  const toasts = ref([])

  function addToast(message, type = 'info', duration = 3000) {
    const toast = { id: Date.now(), message, type }

    // Add the toast to the array
    this.toasts.push(toast)

    // Remove the toast after the specified duration
    setTimeout(() => {
      this.removeToast(toast.id)
    }, duration)
  }

  function removeToast(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
  }

  return {
    addToast,
    removeToast,
    toasts
  }
})
