<script setup>
import { computed, onMounted } from 'vue'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import SearchableDropdown from '@/components/Inputs/SearchableDropdown.vue'
import { useBindersStore } from '@/stores/binders'
import { useTagsStore } from '@/stores/tags'

const emits = defineEmits(['submitBinder'])
const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const binderStore = useBindersStore()
const tagsStore = useTagsStore()

/**
 * @typedef {Object} Binder
 * @property {string} name
 * @property {string} description
 * @property {Array} chosenTags
 * @property {Object} image
 */
const binder = defineModel({ required: true })

const createdTxt = computed(() => {
  if (props.editMode) {
    return props.loading ? 'Updating...' : 'Update'
  }

  return props.loading ? 'Creating...' : 'Create'
})

const isValid = computed(() => {
  return binder.value.name.length > 0 && binder.value.name.length <= 20
})

const options = computed(() => {
  // Dedeupe already selected tags out of the data
  return tagsStore.tags.filter((tag) => !binder.value.chosenTags.includes(tag))
})

function handleTagSelect(tag) {
  binder.value.chosenTags.push(tag)
}

onMounted(async () => {
  await Promise.all([tagsStore.retrieveTags(), binderStore.retrieveBinderThumbnails()])
})
</script>

<template>
  <form
    class="create-form"
    @submit.prevent="emits('submitBinder', binder)"
  >
    <div>
      <label
        class="required"
        for="name"
      >
        Name
      </label>
      <span class="input__subtext">
        <p>Name should be between 1 - 20 characters long</p>
      </span>
      <input
        id="name"
        class="form-control"
        v-model="binder.name"
        type="text"
        required
        maxlength="20"
        :disabled="loading"
      />
      <span
        class="form__error"
        v-if="binder.name.length > 20"
      >
        Name must be less than 20 characters
      </span>
    </div>
    <div>
      <label for="description">Description</label>
      <span class="input__subtext">
        <p>
          Give a description to your binder,
          <a
            href="https://github.github.com/gfm/"
            target="_blank"
          >
            Markdown
          </a>
          is supported here
        </p>
      </span>
      <textarea
        id="description"
        class="form-control"
        v-model="binder.description"
        rows="10"
        type="text"
        :disabled="loading"
      />
    </div>
    <div>
      <label for="tags">Tags</label>
      <span class="input__subtext">
        <p>Tags can be used to help others find your binder</p>
      </span>
      <searchable-dropdown
        @select="handleTagSelect"
        :tags="options"
      />
      <section class="tags">
        <div
          v-for="tag in binder.chosenTags"
          :key="tag.id"
          class="tag"
        >
          <span>{{ tag.title }}</span>
          <vue-feather
            @click="binder.chosenTags = binder.chosenTags.filter((t) => t.id !== tag.id)"
            size="18"
            type="x"
          />
        </div>
      </section>
    </div>
    <div>
      <label for="image">Binder Thumbnail</label>
      <span class="input__subtext">
        <p>Make your binder look nice! Give it a look!</p>
      </span>
      <scroll-area-root
        class="scroll-area__root"
        style="--scrollbar-size: 10px"
      >
        <scroll-area-viewport class="scroll-area__viewport">
          <div class="thumbnails">
            <div
              v-for="thumbnail in binderStore.thumbnails"
              class="thumbnail"
              :key="thumbnail.id"
            >
              <img
                @click="binder.image = thumbnail"
                class="thumbnail__image"
                :class="{ 'thumbnail--selected': thumbnail.id === binder.image.id }"
                :src="thumbnail.url"
                alt="Binder Thumbnail"
              />
            </div>
          </div>
          <scroll-area-scrollbar class="scroll-area__scrollbar">
            <scroll-area-thumb class="scroll-area__thumb" />
          </scroll-area-scrollbar>
        </scroll-area-viewport>
      </scroll-area-root>
    </div>
    <button
      :disabled="!isValid || loading"
      class="btn btn__primary"
      type="submit"
    >
      {{ createdTxt }}
      <vue-feather
        v-if="loading"
        animation="spin"
        size="18"
        type="loader"
      />
    </button>
  </form>
</template>

<style scoped>
.btn {
  width: 50%;
  margin: auto;
  text-transform: uppercase;
}

.dropdown {
  margin-top: 0.5rem;
}

.input__subtext {
  font-size: 12px;
  color: var(--white-dark);
}

.required::after {
  content: '*';
  color: var(--secondary);
}

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

textarea {
  resize: vertical;
}

.form-container h1 {
  text-align: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: auto;
  gap: 0.5rem;
  margin: 0;
}

.tag i {
  cursor: pointer;
}

.tag:hover {
  background-color: var(--secondary);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid var(--white-dark);
  background-color: var(--white);
  color: var(--black);
  border-radius: 0.25rem;
}

.thumbnails {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.thumbnail--selected {
  transform: scale(1.1);
  border: 1px solid var(--accent);
}

.thumbnail__image {
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform 0.2s;
}

.thumbnail__image:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 90%;
  }

  .thumbnails {
    justify-content: center;
    gap: 0.25rem;
  }
}
</style>
