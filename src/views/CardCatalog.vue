<script setup>
import { ref, onMounted } from 'vue'
import { Separator } from 'radix-vue'
import { useCardsStore } from '@/stores/cards'
import { usePaginationStore } from '@/stores/pagination'
import { useBindersStore } from '@/stores/binders'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Cards/Card.vue'
import Pagination from '@/components/Pagination.vue'
import Toast from '@/components/Toast.vue'
import AddCard from '@/components/Dialogs/AddCard.vue'

const cardsStore = useCardsStore()
const paginationStore = usePaginationStore()
const bindersStore = useBindersStore()
const loading = ref(true)
const addingCard = ref(false)
const openToast = ref(false)
const limit = 10

async function fetchCards(page) {
  loading.value = true
  try {
    const offset = (page - 1) * limit
    await cardsStore.retrieveCards({
      limit,
      offset
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function addCardToBinder(card) {
  console.log(card)
  addingCard.value = true
  setTimeout(() => {
    addingCard.value = false
    openToast.value = true
  }, 2000)
}

onMounted(async () => {
  fetchCards(paginationStore.currentPage)
  // Make a request to retrieve all the users binders
})
</script>

<template>
  <div v-if="!loading">
    <h1>Card Catalog</h1>
    <div class="card-catalog">
      <section class="card-catalog__action-panel"></section>
      <separator class="separator__root" />
      <div class="pagination-container pagiantion--first">
        <pagination @update:page="fetchCards" />
      </div>
      <div class="card-catalog__card card-container container--lg">
        <card
          v-for="card in cardsStore.cards"
          :key="card.id"
        >
          <template #main>
            <div class="img__container">
              <img
                :alt="card.name"
                :src="`https://imgs.yugibinder.com/cards/normal/${card.id}.jpg`"
              />
            </div>
          </template>
          <template #text>
            <p>{{ card.name }}</p>
          </template>
          <template #tags>
            <div class="btn__container">
              <add-card
                dialog-title="Add Card"
                description="Add card to your binder"
                @add="addCardToBinder(card)"
              >
                <template #trigger>
                  <button
                    title="Add to Binder"
                    class="btn btn__primary has-icon btn--sm"
                  >
                    <vue-feather
                      v-if="addingCard"
                      animation="spin"
                      type="loader"
                    />
                    <vue-feather
                      v-else
                      type="plus-circle"
                    />
                  </button>
                </template>
              </add-card>
            </div>
          </template>
        </card>
      </div>
      <div class="pagination-container">
        <pagination @update:page="fetchCards" />
      </div>
    </div>
    <toast
      v-model="openToast"
      :duration="2000"
      :action-alt="`Go to Binder`"
      title="Card Added"
    >
      <template #description>
        <p>Card has been added to your binder.</p>
      </template>
      <template #action>
        <router-link
          title="Go to Binder"
          class="btn btn__primary has-icon btn--sm"
          :to="`/binders`"
        >
          <vue-feather type="arrow-right-circle" />
        </router-link>
      </template>
    </toast>
  </div>
  <loader
    v-else
    class="center is-large"
    size="large"
    loader-style="vertical"
  />
</template>

<style scoped>
.card-catalog {
  margin-bottom: 2rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.pagiantion--first {
  margin-bottom: 2rem;
}

.separator__root {
  margin-bottom: 2rem;
}

.img__container img {
  max-width: 300px;
}

@media screen and (max-width: 768px) {
  .card-catalog {
    margin-bottom: 0;
  }
}
</style>
