<script setup>
import { onMounted, ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import Loader from '@/components/Loader.vue'
import FloatingCard from '@/components/Cards/FloatingCard.vue'

const props = defineProps({
  cardId: String,
  isRandom: Boolean
})
const cardsStore = useCardsStore()
const loading = ref(true)
const card = ref(null)

onMounted(async () => {
  try {
    if (props.isRandom) {
      card.value = (await cardsStore.retrieveRandomCard())[0]
    } else {
      card.value = await cardsStore.retrieveCardById(props.cardId)
    }
    loading.value = false
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div
    v-if="!loading"
    class="card-view"
  >
    <h1>Card View {{ card.id }}</h1>
    <floating-card :img="`https://imgs.yugibinder.com/cards/small/${card.id}.jpg`" />
  </div>
  <loader
    v-else
    class="center is-large"
    size="large"
  />
</template>
