<script setup>
import { computed, onMounted, ref } from 'vue'
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router'
import { useBindersStore } from '@/stores/binders'
import Loader from '@/components/Loader.vue'
import BinderForm from '@/components/Forms/BinderForm.vue'

const props = defineProps({
  binderId: {
    type: String,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

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

const headerTxt = computed(() => {
  return props.isEditing ? 'Update Binder' : 'Create Binder'
})

async function handleFormSubmit(binder) {
  creating.value = true
  if (props.isEditing && props.binderId) {
    await binderStore.updateBinder({
      id: props.binderId,
      name: binder.name,
      description: DOMPurify.sanitize(binder.description),
      tags: binder.chosenTags.slice(0, 10),
      thumbnail: binder.image.id
    })
  } else {
    await binderStore.createBinder({
      name: binder.name,
      description: DOMPurify.sanitize(binder.description),
      tags: binder.chosenTags.slice(0, 10),
      thumbnail: binder.image.id
    })
  }

  creating.value = false
  return router.replace('/')
}

onMounted(async () => {
  if (props.isEditing) {
    const binder = await binderStore.retrieveBinderById(props.binderId, 'yes')
    creatingBinder.value = {
      name: binder.name,
      description: binder.description,
      chosenTags: binder.tags,
      image: binder.thumbnail
    }
  }

  loading.value = false
})
</script>

<template>
  <section
    class="form-container"
    v-if="!loading"
  >
    <h1>{{ headerTxt }}</h1>
    <p
      v-if="isEditing"
      class="subtext"
    >
      Editing Binder: {{ creatingBinder.name }}
    </p>
    <binder-form
      v-model="creatingBinder"
      :editMode="isEditing"
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

.subtext {
  margin: 0;
  font-size: 14px;
  color: var(--white-dark);
  text-align: center;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 90%;
  }
}
</style>
