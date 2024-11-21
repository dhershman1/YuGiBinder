<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import { useDebounceFn } from '@vueuse/core'
import { useClickOutside } from '@/composables/useClickOutside'

const props = defineProps({
  tags: Array,
  disabled: Boolean
})
const emits = defineEmits(['select'])

const searchTerm = ref('')
const dropdownOpen = ref(false)
const highlightedIndex = ref(-1)
const dropdownId = ref('dropdown')
const dropdownList = ref(null)

// Debounced function to handle search term updates
const handleSearch = useDebounceFn(() => {
  dropdownOpen.value = true
  highlightedIndex.value = -1 // Reset highlight on new search
}, 300)

// Computed filtered list of tags based on search term
const filteredTags = computed(() => {
  return props.tags.filter((tag) => tag.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

// Function to handle tag selection
function selectTag(tag) {
  emits('select', tag)
  closeDropdown()
}

// Function to open dropdown
function openDropdown() {
  dropdownOpen.value = true
}

// Function to close dropdown
function closeDropdown() {
  dropdownOpen.value = false
  highlightedIndex.value = -1
}

// Function to select highlighted tag
function selectHighlightedTag() {
  if (highlightedIndex.value !== -1 && filteredTags.value[highlightedIndex.value]) {
    selectTag(filteredTags.value[highlightedIndex.value])
  }
}

// Navigation function to handle up and down arrow keys
function navigateDropdown(direction) {
  if (!dropdownOpen.value) return

  const itemCount = filteredTags.value.length
  const listElement = dropdownList.value

  if (direction === 'down') {
    highlightedIndex.value = (highlightedIndex.value + 1) % itemCount
  } else if (direction === 'up') {
    highlightedIndex.value = (highlightedIndex.value - 1 + itemCount) % itemCount
  }

  // Auto scroll down when reaching the bottom
  const itemElement = listElement.querySelector(`#dropdown-item-${highlightedIndex.value}`)
  if (itemElement) {
    const rect = itemElement.getBoundingClientRect()
    const listRect = listElement.getBoundingClientRect()

    if (rect.bottom > listRect.bottom) {
      listElement.scrollTop += rect.bottom - listRect.bottom // Scroll down
    } else if (rect.top < listRect.top) {
      listElement.scrollTop -= listRect.top - rect.top // Scroll up
    }
  }
}

// Use the custom hook to detect clicks outside the dropdown
const dropdownRef = useClickOutside(() => {
  closeDropdown()
})

// Escape key handler to close the dropdown
function handleEscape(event) {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

// Attach the escape key event listener
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="dropdown"
  >
    <!-- Search Input Field -->
    <input
      v-model="searchTerm"
      @input="handleSearch"
      @focus="openDropdown"
      @keydown.down.prevent="navigateDropdown('down')"
      @keydown.up.prevent="navigateDropdown('up')"
      @keydown.enter.prevent="selectHighlightedTag"
      @keydown.esc.prevent="closeDropdown"
      type="text"
      placeholder="Search tags..."
      aria-haspopup="listbox"
      :aria-expanded="dropdownOpen"
      :aria-activedescendant="highlightedIndex !== -1 ? `dropdown-item-${highlightedIndex}` : null"
      class="search-input"
      :disabled="disabled"
    />

    <!-- Dropdown Content with Virtual Scroller -->
    <div
      v-if="dropdownOpen && !disabled"
      class="dropdown-content"
      role="listbox"
      :aria-labelledby="dropdownId"
      ref="dropdownList"
    >
      <RecycleScroller
        :items="filteredTags"
        :item-size="40"
        class="virtual-scroller"
        v-slot="{ item, index }"
      >
        <div
          :id="`dropdown-item-${index}`"
          class="dropdown-item"
          :class="{ highlighted: index === highlightedIndex }"
          role="option"
          :aria-selected="index === highlightedIndex"
          @click="selectTag(item)"
          @mouseenter="highlightedIndex = index"
        >
          {{ item.title }}
        </div>
      </RecycleScroller>

      <!-- Empty State Message -->
      <div
        v-if="filteredTags.length === 0"
        class="empty-state"
      >
        No tags found
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
}

.search-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid var(--white-dark);
  border-radius: 4px;
}

.search-input[disabled] {
  cursor: not-allowed;
  color: var(--warmgrey);
  background-color: var(--white-dark);
}

.dropdown-content {
  position: absolute;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--white-dark);
  background-color: var(--white);
  box-shadow: 0 4px 8px var(--shadow);
  border-radius: 4px;
  margin-top: 8px;
  z-index: 10;
  color: var(--black);
}

.virtual-scroller {
  max-height: 200px;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item.highlighted {
  background-color: var(--white-dark);
}

.empty-state {
  padding: 10px;
  text-align: center;
  color: #999;
}
</style>
