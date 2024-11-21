<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import DotLoader from '@/components/DotLoader.vue'

// Stores
const cardsStore = useCardsStore()
// Refs
const loading = ref(true)
const cards = ref(null)
const autoplayInterval = ref(null)
const stack = ref(null)
const stackedCards = ref(null)

// JavaScript to do our swapping effect
function moveCard() {
  const lastCard = stack.value.lastElementChild
  if (lastCard.classList.contains('stacked-card')) {
    lastCard.classList.add('swap')

    setTimeout(() => {
      lastCard.classList.remove('swap')
      stack.value.insertBefore(lastCard, stack.value.firstElementChild)
    }, 1200)
  }
}

onMounted(async () => {
  cards.value = await cardsStore.retrieveRandomCard(5)
  autoplayInterval.value = setInterval(moveCard, 2500)
  loading.value = false
  await nextTick()
  stack.value = document.querySelector('.stack')
  stackedCards.value = Array.from(stack.value.children)
    .reverse()
    .filter((child) => child.classList.contains('stacked-card'))
  stackedCards.value.forEach((card) => stack.value.appendChild(card))
})
</script>

<template>
  <div
    v-if="!loading && cards"
    class="not-found"
  >
    <section class="content">
      <div class="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <div class="action-link-wrap">
          <router-link
            to="/"
            class="action-link btn btn__primary"
            >Go to Home</router-link
          >
        </div>
      </div>
    </section>
    <section
      class="stack"
      @click="moveCard"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="stacked-card"
      >
        <img :src="`https://imgs.yugibinder.com/cards/normal/${card.id}.jpg`" />
      </div>
    </section>
  </div>
  <dot-loader v-else />
</template>

<style scoped>
.not-found {
  display: grid;
  grid-template-columns: 2fr 3fr;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.message-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.message-box h1 {
  font-size: 10rem;
  margin: 0;
}

.stack {
  position: relative;
}

.stacked-card {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 350px;
  height: 500px;
  box-shadow:
    0 5px 10px 0 rgba(0, 0, 0, 0.25),
    0 15px 20px 0 rgba(0, 0, 0, 0.125);
  transition: transform 0.6s;
  user-select: none;
}

.stacked-card img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
  pointer-events: none;
}

.stacked-card:nth-last-child(n + 5) {
  --x: calc(-50% + 90px);
  transform: translate(var(--x), -50%) scale(0.85);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
}

.stacked-card:nth-last-child(4) {
  --x: calc(-50% + 60px);
  transform: translate(var(--x), -50%) scale(0.9);
}

.stacked-card:nth-last-child(3) {
  --x: calc(-50% + 30px);
  transform: translate(var(--x), -50%) scale(0.95);
}

.stacked-card:nth-last-child(2) {
  --x: calc(-50%);
  transform: translate(var(--x), -50%) scale(1);
}

.stacked-card:nth-last-child(1) {
  --x: calc(-50% - 30px);
  transform: translate(var(--x), -50%) scale(1.05);
}

.stacked-card:nth-last-child(1) img {
  box-shadow: 0 1px 5px 5px rgba(255, 193, 111, 0.5);
}

.swap {
  animation: swap 1.3s ease-out forwards;
}

@keyframes swap {
  30% {
    transform: translate(calc(var(--x) - 250px), -50%) scale(0.85) rotate(-5deg) rotateY(65deg);
  }
  100% {
    transform: translate(calc(var(--x) - 30px), -50%) scale(0.5);
    z-index: -1;
  }
}

@media (max-width: 768px) {
  .not-found {
    grid-template-columns: 1fr;
  }

  .action-link-wrap {
    margin-top: 1rem;
  }

  .action-link {
    padding: 1.5rem;
  }

  .stack {
    display: none;
  }
}
</style>
