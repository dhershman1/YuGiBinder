<script setup>
import { computed, ref, onMounted } from 'vue'
import { Separator } from 'radix-vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useWindowSize } from '@vueuse/core'
import { useCardsStore } from '@/stores/cards'
import { usePaginationStore } from '@/stores/pagination'
import { useBindersStore } from '@/stores/binders'
import { useToastStore } from '@/stores/toasts'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Cards/Card.vue'
import Pagination from '@/components/Pagination.vue'
import Toast from '@/components/Toast.vue'

const cardsStore = useCardsStore()
const paginationStore = usePaginationStore()
const bindersStore = useBindersStore()
const toastStore = useToastStore()
const { width } = useWindowSize()
const loading = ref(true)
const addingCard = ref(false)
const openToast = ref(false)
const { isAuthenticated } = useAuth0()
const limit = computed(() => {
  if (width.value > 1224) {
    return 10
  } else if (width.value > 768) {
    return 8
  } else {
    return 6
  }
})

async function fetchCards(page) {
  try {
    const offset = (page - 1) * limit.value
    await cardsStore.retrieveCards({
      limit: limit.value,
      offset
    })
  } catch (error) {
    console.error(error)
    toastStore.addToast('An error occurred while fetching cards', 'error')
  } finally {
    loading.value = false
  }
}

async function addCardToBinder(card) {
  if (!bindersStore.currentBinder) {
    toastStore.addToast('Please select a binder first', 'warning')
    return
  }

  addingCard.value = true

  // Make a request to add the card to the current binder
  await bindersStore.addCardToBinder(card.id)

  addingCard.value = false
  openToast.value = true
}

onMounted(async () => {
  fetchCards(paginationStore.currentPage)
  // Make a request to retrieve all the users binders only if they're authenticated
  if (isAuthenticated.value) {
    await bindersStore.retrieveUsersBinders()
  }
})
</script>

<template>
  <div v-if="!loading">
    <h1>Card Catalog</h1>
    <div class="card-catalog">
      <section
        v-if="isAuthenticated"
        class="card-catalog__action-panel"
      >
        Current Binder: {{ bindersStore.currentBinder?.name || 'None' }}
        <select v-model="bindersStore.currentBinder">
          <option value="">Select a Binder</option>
          <option
            v-for="binder in bindersStore.currentUsersBinders"
            :key="binder.id"
            :value="binder"
          >
            {{ binder.name }}
          </option>
        </select>
      </section>
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
              <button
                title="Add to Binder"
                class="btn btn__primary has-icon btn--sm"
                @click="addCardToBinder(card)"
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

@media screen and (max-width: 1224px) {
  .container--lg {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .card-catalog {
    margin-bottom: 0;
  }

  .container--lg {
    display: grid;
    grid-template-columns: repeat(1, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>
