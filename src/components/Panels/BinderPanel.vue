<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { useWindowSize } from '@vueuse/core'
import { useBindersStore } from '@/stores/binders'
import { useCardsStore } from '@/stores/cards'
import DropDownCircle from '@/components/DropDownCircle.vue'

const binderStore = useBindersStore()
const cardsStore = useCardsStore()
const { width } = useWindowSize()
const backgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, rgba(65, 68, 67, 0.8), rgba(65, 68, 67, 75%)), url(${binderStore.currentBinder.thumbnail})`,
  backgroundSize: 'cover',
  backgroundPosition: 'right'
}))

function formatDate(date) {
  return format(new Date(date), 'MMM dd, yyyy')
}
</script>

<template>
  <aside
    class="panel__header"
    :style="backgroundStyle"
  >
    <h1 class="panel__name">{{ binderStore.currentBinder.name }}</h1>
    <section class="panel__info">
      <span class="panel--cntr">
        <vue-feather type="user" />
        Created by: {{ binderStore.currentBinder.username || 'Unknown' }}
      </span>
    </section>
    <section class="panel__dates">
      <span class="panel--cntr">
        <vue-feather type="calendar" />
        Created: {{ formatDate(binderStore.currentBinder.created_at) }}
      </span>
      <span class="panel--cntr">
        <vue-feather type="calendar" /> Last Updated:
        {{ formatDate(binderStore.currentBinder.updated_at) }}
      </span>
    </section>
    <section class="panel__metadata">
      <span class="panel--cntr">
        <vue-feather type="eye" />
        {{ binderStore.currentBinder.views }} Views
      </span>
      <span
        class="panel--cntr"
        title="Cards in Binder"
      >
        <vue-feather type="layers" />
        {{ cardsStore.cardsInBinder.length }}
      </span>
      <span
        v-if="binderStore.currentBinder.tags.length < 3 && width > 768"
        class="panel__tags__container"
      >
        <span
          class="panel--cntr"
          v-for="tag in binderStore.currentBinder.tags"
          :key="tag"
        >
          <vue-feather type="tag" />
          {{ tag }}
        </span>
      </span>
      <drop-down-circle
        v-else
        :icon="'tag'"
        :items="binderStore.currentBinder.tags"
      />
    </section>
  </aside>
</template>
