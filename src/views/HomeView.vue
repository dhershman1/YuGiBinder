<script setup>
import { onMounted, ref } from 'vue'
import { Separator } from 'radix-vue'
import { formatDistanceToNow } from 'date-fns'
import { useCardsStore } from '@/stores/cards'
import { useBindersStore } from '@/stores/binders'
import Loader from '@/components/Loader.vue'
import FullImageCard from '@/components/Cards/FullImageCard.vue'

const cardsStore = useCardsStore()
const binderStore = useBindersStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await Promise.all([
      binderStore.retrieveBinders({
        limit: 5,
        sort: 'desc',
        order: 'created_at'
      }),
      cardsStore.retrieveTopCards()
    ])
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
      <div
        v-if="binderStore.binders.length"
        class="card-container"
        :class="{ 'container--lg': binderStore.binders.length > 3 }"
      >
        <div
          v-for="binder in binderStore.binders"
          :key="binder.id"
          class="full-img__card-container"
          aria-label="Binder Card"
          aria-role="link"
          @click="() => $router.push(`/binders/${binder.id}`)"
        >
          <full-image-card
            v-motion-slide-left
            :item="binder"
          >
            <template #stats>
              <span>
                <vue-feather
                  type="eye"
                  size="12"
                />
                {{ binder.views }}
              </span>
              <span>
                <vue-feather
                  type="calendar"
                  size="12"
                />
                {{ formatDistanceToNow(binder.created_at, { addSuffix: true }) }}
              </span>
              <div>
                Created By
                <vue-feather
                  type="user"
                  size="12"
                />
                {{ binder.username }}
              </div>
            </template>
          </full-image-card>
        </div>
      </div>
      <div
        class="no-binders"
        v-else
      >
        <p>No binders found.</p>
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

.no-binders {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.card__wrapper {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

@media screen and (max-width: 768px) {
  .card__wrapper {
    gap: 0.5rem;
    margin-bottom: 0;
  }
}
</style>
