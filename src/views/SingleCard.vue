<script setup>
import { onMounted, ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import Loader from '@/components/Loader.vue'
import FloatingCard from '@/components/FloatingCard.vue'

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
    <floating-card :img="`https://imgs.yugibinder.com/cards/small/${cardId}.jpg`" />
  </div>
  <loader
    v-else
    class="center is-large"
    size="large"
  />
</template>
