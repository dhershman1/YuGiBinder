<script setup>
import { onMounted, ref } from 'vue'
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/stores/tags'
import { useBindersStore } from '@/stores/binders'
import Loader from '@/components/Loader.vue'
import BinderForm from '@/components/Forms/BinderForm.vue'

const tagsStore = useTagsStore()
const binderStore = useBindersStore()
const router = useRouter()

const creatingBinder = ref({
  name: '',
  description: '',
  chosenTags: [],
  image: {}
})

const loading = ref(true)
const creating = ref(false)

async function handleFormSubmit(binder) {
  creating.value = true
  await binderStore.createBinder({
    name: binder.name,
    description: DOMPurify.sanitize(binder.description),
    tags: binder.chosenTags,
    thumbnail: binder.image.id
  })

  creating.value = false
  return router.replace('/')
}

onMounted(async () => {
  await Promise.all([tagsStore.retrieveTags(), binderStore.retrieveBinderThumbnails()])

  creatingBinder.value.image = binderStore.thumbnails[0]
  loading.value = false
})
</script>

<template>
  <section
    class="form-container"
    v-if="!loading"
  >
    <h1>Create Binder</h1>
    <binder-form
      v-model="creatingBinder"
      :loading="creating"
      @submitBinder="handleFormSubmit"
    />
  </section>
  <loader
    class="center is-large"
    size="large"
    v-else
  />
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  margin: auto;
  margin-top: 1rem;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.form-container label {
  display: block;
}

.form-container input,
.form-container textarea {
  width: 98%;
}

.form-container h1 {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 90%;
  }
}
</style>
