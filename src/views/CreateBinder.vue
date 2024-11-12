<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTagsStore } from '@/stores/tags'
import Loader from '@/components/Loader.vue'
import SearchableDropdown from '@/components/Inputs/SearchableDropdown.vue'

const name = ref('')
const description = ref('')
const chosenTags = ref([])
const image = ref('')
const loading = ref(true)

const tagsStore = useTagsStore()

function handleTagSelect(tag) {
  chosenTags.value.push(tag)
}

const options = computed(() => {
  // Dedeupe already selected tags out of the data
  return tagsStore.tags.filter((tag) => !chosenTags.value.includes(tag))
})

onMounted(async () => {
  await tagsStore.retrieveTags()
  loading.value = false
})
</script>

<template>
  <form v-if="!loading">
    <div>
      <label for="name">Name:</label>
      <input
        id="name"
        class="form-control"
        v-model="name"
        type="text"
        required
      />
    </div>
    <div>
      <label for="description">Description:</label>
      <input
        id="description"
        class="form-control"
        v-model="description"
        type="text"
        required
      />
    </div>
    <div>
      <label for="tags">Tags:</label>
      <searchable-dropdown
        @select="handleTagSelect"
        :tags="options"
      />
      <section class="tags">
        <div
          v-for="tag in chosenTags"
          :key="tag.id"
          class="tag"
        >
          <span>{{ tag.title }}</span>
          <vue-feather
            @click="chosenTags = chosenTags.filter((t) => t.id !== tag.id)"
            size="18"
            type="x"
          />
        </div>
      </section>
    </div>
    <div>
      <label for="image">Image:</label>
      <input
        id="image"
        class="form-control"
        v-model="image"
        type="text"
        required
      />
    </div>
    <button
      class="btn btn__primary"
      type="submit"
    >
      Create
    </button>
  </form>
  <loader
    class="center is-large"
    size="large"
    v-else
  />
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tag {
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: auto;
  gap: 0.5rem;
}

.tag i {
  cursor: pointer;
}

.tag:hover {
  background-color: var(--secondary);
}
</style>
