<script setup>
import { onMounted, ref } from 'vue'
import { Separator } from 'radix-vue'
import { useCardsStore } from '@/stores/cards'
import { useBindersStore } from '@/stores/binders'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'

const cardsStore = useCardsStore()
const binderStore = useBindersStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await binderStore.retrieveBinders({
      limit: 5,
      sort: 'desc',
      order: 'created_at'
    })
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
          v-for="binder in binderStore.binders"
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
                :src="binder.thumbnail"
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
    <h2>Current Top 20 Cards</h2>
    <section class="card__wrapper">
      <div
        class="card-jpg"
        v-for="card in cardsStore.topCards"
        :key="card.id"
        v-motion-pop-visible-once
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

.card__wrapper {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.separator__root {
  background-color: var(--accent);
  height: 1px;
  width: 50%;
  margin: auto;
  margin-top: 1rem;
}

@media screen and (max-width: 768px) {
  .card__wrapper {
    gap: 0.5rem;
    margin-bottom: 0;
  }
}
</style>
