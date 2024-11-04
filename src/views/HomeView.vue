<script setup>
import { onMounted, ref } from 'vue'
import { Separator } from 'radix-vue'
import { useCardsStore } from '@/stores/cards'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'

const recentBinders = ref([])
const cardsStore = useCardsStore()
const loading = ref(true)

onMounted(async () => {
  recentBinders.value = [
    {
      id: 1,
      name: 'Binder 1',
      description: 'This is the first binder',
      tags: ['yugioh', 'cards', 'relinquished', 'ritual']
    },
    {
      id: 2,
      name: 'Binder 2',
      description: 'This is the second binder',
      tags: ['yugioh', 'cards']
    },
    {
      id: 3,
      name: 'Binder 3',
      description: 'This is the third binder',
      tags: ['yugioh', 'cards']
    }
  ]
  try {
    await cardsStore.retrieveTopCards()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div
    v-if="!loading"
    class="home"
  >
    <section class="binders">
      <h2>Recent Binders</h2>
      <div class="card-container">
        <card
          v-for="binder in recentBinders"
          :key="binder.id"
          aria-role="link"
        >
          <template #main>
            <div
              @click="() => $router.push(`/binders/${binder.id}`)"
              aria-role="button"
              class="card__img"
            >
              <img
                :alt="binder.name"
                src="/imgs/binder.webp"
              />
            </div>
          </template>
          <template #text>
            <p>{{ binder.name }}</p>
          </template>
          <template #tags>
            <div class="tags__container">
              <span
                v-for="tag in binder.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </template>
        </card>
      </div>
    </section>
    <separator class="separator__root" />
    <section class="card__specs">
      <h2>Current Top 20 Cards</h2>
      <div
        class="card-jpg"
        v-for="card in cardsStore.topCards"
        :key="card.id"
        v-motion-slide-visible-top
        @click="() => $router.push(`/cards/${card.id}`)"
      >
        <img :src="`https://imgs.yugibinder.com/cards/small/${card.id}.jpg`" />
      </div>
    </section>
  </div>
  <loader
    class="center is-large"
    size="large"
    v-else
  />
</template>

<style scoped>
.binders h2 {
  text-align: center;
}

.card-jpg {
  display: inline-block;
  margin: 1rem;
}

.separator__root {
  background-color: var(--accent);
  height: 1px;
  width: 50%;
  margin: auto;
  margin-top: 1rem;
}
</style>
