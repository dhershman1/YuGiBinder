<script setup>
import { onMounted, ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useBindersStore } from '@/stores/binders'
import { useCardsStore } from '@/stores/cards'
import Loader from '@/components/Loader.vue'
import SelectBox from '@/components/Inputs/SelectBox.vue'

const props = defineProps({
  id: String
})
const binderStore = useBindersStore()
const cardsStore = useCardsStore()
const { width } = useWindowSize()

const loading = ref(true)
const binderDisplay = ref('3x3')
const groups = [
  {
    label: 'Display',
    items: ['1x1', '3x3', '4x3']
  }
]
const pageSizing = computed(() => {
  switch (binderDisplay.value) {
    case '3x3':
      return 9
    case '4x3':
      return 12
    case '1x1':
      return 1
    default:
      return 9
  }
})

onMounted(async () => {
  if (width.value < 768) {
    binderDisplay.value = '1x1'
  } else if (width.value < 1024) {
    binderDisplay.value = '3x3'
  } else {
    binderDisplay.value = '4x3'
  }

  await binderStore.retrieveBinderById(props.id)
  await cardsStore.retrieveCardsInBinder(props.id, pageSizing.value)
  loading.value = false
})
</script>

<template>
  <div class="binder-cards">
    <section v-if="!loading">
      <aside class="binder-cards__sidebar">
        <h2>Filters</h2>
        <div class="binder-cards__filters">
          <select-box
            v-model="binderDisplay"
            :groups="groups"
          />
        </div>
      </aside>
      <div class="binder-cards__header">
        <h1>{{ binderStore.currentBinder.name }}</h1>
      </div>
    </section>
    <loader
      class="center is-large"
      size="large"
      v-else
    />
  </div>
</template>

<style scoped>
.binder-cards section {
  display: grid;
  grid-template-columns: 1fr 6fr;
  height: 100%;
}

.binder-cards__sidebar {
  border-right: 1px solid var(--accent);
}
</style>
