<script setup>
import { onMounted, ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import Loader from '@/components/Loader.vue'

const props = defineProps({
  cardId: String
})
const cardsStore = useCardsStore()
const loading = ref(true)

onMounted(async () => {
  await cardsStore.retrieveCardById(props.cardId)
  loading.value = false
})
</script>

<template>
  <div
    v-if="!loading"
    class="card-view"
  >
    <h1>Card View {{ cardId }}</h1>
    <img
      :src="`https://imgs.yugibinder.com/cards/small/${cardId}.jpg`"
      :alt="cardsStore.currentCard.name"
    />
  </div>
  <loader
    v-else
    class="center is-large"
    size="large"
  />
</template>
