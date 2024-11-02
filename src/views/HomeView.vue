<script setup>
import { onMounted, ref } from 'vue'
import Card from '@/components/Card.vue'

const recentBinders = ref([])

onMounted(() => {
  recentBinders.value = [
    {
      id: 1,
      name: 'Binder 1',
      description: 'This is the first binder'
    },
    {
      id: 2,
      name: 'Binder 2',
      description: 'This is the second binder'
    },
    {
      id: 3,
      name: 'Binder 3',
      description: 'This is the third binder'
    }
  ]
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
        >
          <template #main>
            <div class="card__img">
              <img
                :alt="binder.name"
                src="/imgs/binder.webp"
              />
            </div>
          </template>
          <template #text>
            <p>{{ binder.name }}</p>
          </template>
        </card>
      </div>
    </section>
  </div>
</template>
