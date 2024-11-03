<script setup>
import { onMounted, ref } from 'vue'
import { Separator } from 'radix-vue'
import Card from '@/components/Card.vue'

const recentBinders = ref([])
const randomCard = ref({})

async function fetchRandoCard() {
  const response = await fetch('/api/random', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  return data.data[0]
}

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
    randomCard.value = await fetchRandoCard()
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="home">
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
      <h2>Random YGO Card</h2>
      <img :src="`https://imgs.yugibinder.com/cards/small/${randomCard.id}.jpg`" />
    </section>
  </div>
</template>

<style scoped>
.binders h2 {
  text-align: center;
}

.separator__root {
  background-color: var(--accent);
  height: 1px;
  width: 50%;
  margin: auto;
  margin-top: 1rem;
}
</style>
