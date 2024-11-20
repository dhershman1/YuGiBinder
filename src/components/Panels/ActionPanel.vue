<script setup>
import { computed, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { useBindersStore } from '@/stores/binders'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toasts'
import Confirmation from '@/components/Dialogs/Confirmation.vue'

const emits = defineEmits(['deleting'])
const binderStore = useBindersStore()
const authStore = useAuthStore()
const toast = useToastStore()
const { isAuthenticated } = useAuth0()
const router = useRouter()
const canModify = computed(() => {
  return binderStore.currentBinder.created_by === authStore.userId
})

async function removeBinder() {
  emits('deleting')
  await binderStore.deleteBinder(binderStore.currentBinder.id)

  toast.addToast('Binder Deleted Successfully', 'success')
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
      <confirmation @confirm="removeBinder">
        <template #trigger>
          <button class="btn btn__primary has-icon">
            <vue-feather type="trash-2" />
            <span>Delete Binder</span>
          </button>
        </template>
        <template #action> Confirm, Delete Binder </template>
      </confirmation>
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
