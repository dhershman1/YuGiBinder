<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  img: String
})

const floatingContainer = ref(null)
const isHovered = ref(false)
const cardStyle = ref({})

const updateCardRotation = (event) => {
  if (!isHovered.value) return // Only apply rotation when hovered

  // Get card container's center coordinates
  const rect = floatingContainer.value.getBoundingClientRect()
  const cardCenterX = rect.left + rect.width / 2
  const cardCenterY = rect.top + rect.height / 2

  // Calculate the rotation angle based on the mouse position
  const deltaX = event.clientX - cardCenterX
  const deltaY = event.clientY - cardCenterY
  const rotationX = deltaY * 0.09
  const rotationY = deltaX * -0.09

  // Update the card's style to reflect the rotation
  cardStyle.value = {
    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.05)`
  }
}

const resetCardRotation = () => {
  isHovered.value = false
  cardStyle.value = {
    transform: 'rotateX(0deg) rotateY(0deg) scale(1)'
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updateCardRotation)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCardRotation)
})
</script>

<template>
  <div
    class="floating-container"
    ref="floatingContainer"
  >
    <div
      class="floating-card"
      :style="cardStyle"
      @mouseenter="isHovered = true"
      @mouseleave="resetCardRotation"
    >
      <img :src="img" />
    </div>
  </div>
</template>

<style scoped>
.floating-container {
  padding: 1.8rem;
  width: 200px;
  perspective: 2000px; /* Adds perspective for 3D effect */
}

.floating-card {
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease; /* Smooth transition for rotation */
}
</style>
