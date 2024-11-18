<script setup>
import { computed, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { useBindersStore } from '@/stores/binders'
import { useAuthStore } from '@/stores/auth'

const binderStore = useBindersStore()
const authStore = useAuthStore()
const { isAuthenticated } = useAuth0()
const router = useRouter()
const canModify = computed(() => {
  return binderStore.currentBinder.created_by === authStore.userId
})
const deleting = ref(false)

async function removeBinder() {
  if (!deleting.value) {
    deleting.value = true
    return
  }

  deleting.value = false
  await binderStore.deleteBinder(binderStore.currentBinder.id)

  return router.replace('/')
}
</script>

<template>
  <aside class="panel__action-panel">
    <h1 class="panel__name">Action Panel</h1>
    <section class="panel--cntr">
      <button class="btn btn__primary has-icon">
        <vue-feather type="pie-chart" />
        See Stats
      </button>
      <button
        v-if="isAuthenticated && !canModify"
        class="btn btn__primary has-icon"
      >
        <vue-feather type="thumbs-up" />
        Like
      </button>
    </section>
    <section
      v-if="canModify"
      class="panel--cntr"
    >
      <router-link
        class="btn btn__primary has-icon"
        :to="`/binders/${binderStore.currentBinder.id}/edit`"
      >
        <vue-feather type="edit" />
        Edit Binder
      </router-link>
      <router-link
        to="/card-catalog"
        class="btn btn__primary has-icon"
      >
        <vue-feather type="plus-circle" />
        Add Cards
      </router-link>
      <button
        @click="removeBinder"
        class="btn btn__primary has-icon"
        :class="deleting ? 'btn__danger' : ''"
      >
        <vue-feather type="trash-2" />
        <span v-if="deleting"> Are you sure? </span>
        <span v-else> Delete Binder </span>
      </button>
      <button
        v-if="deleting"
        class="btn btn__primary"
        @click="deleting = false"
      >
        Cancel
      </button>
    </section>
  </aside>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .panel__wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }

  .panel__dates {
    flex-direction: column;
  }

  .panel--cntr {
    margin-top: 1rem;
  }
}
</style>
