import { onMounted, onUnmounted, ref } from 'vue'

export function useClickOutside(handler) {
  const elementRef = ref(null)

  const onClickOutside = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('click', onClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
  })

  return elementRef
}
