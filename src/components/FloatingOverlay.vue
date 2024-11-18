<script setup>
import FloatingCard from './Cards/FloatingCard.vue'

const open = defineModel()
defineProps({
  selectedCardId: {
    type: String,
    required: true
  }
})

function closeOverlay() {
  open.value = false
}
</script>

<template>
  <div
    v-if="open"
    class="overlay"
    @click="closeOverlay"
  >
    <div
      class="overlay-content"
      @click.stop
    >
      <floating-card
        class="selected-card animate-card"
        :img="`https://imgs.yugibinder.com/cards/normal/${selectedCardId}.jpg`"
      />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.overlay-content {
  position: relative;
  display: flex;
  justify-content: center;
}

.selected-card {
  position: absolute;
  width: 500px;
  transition: transform 0.3s ease;
}

.animate-card {
  animation: bringForward 0.5s ease forwards;
}

@keyframes bringForward {
  0% {
    transform: scale(0.5) translateY(100%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@media screen and (max-width: 1224px) {
  .selected-card {
    width: 400px;
  }
}

@media screen and (max-width: 768px) {
  .selected-card {
    width: 300px;
  }
}
</style>
