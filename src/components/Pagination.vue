<script setup>
import { computed } from 'vue'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot
} from 'radix-vue'
import { useWindowSize } from '@vueuse/core'
import { usePaginationStore } from '@/stores/pagination'

const paginationStore = usePaginationStore()
const { width } = useWindowSize()

const emits = defineEmits(['update:page'])
const props = defineProps({
  siblings: Number
})

const siblingCount = computed(() => {
  if (props.siblings) return props.siblings

  return width.value > 768 ? 1 : 0
})
</script>

<template>
  <pagination-root
    :total="paginationStore.totalItems"
    :sibling-count="siblingCount"
    :items-per-page="paginationStore.itemsPerPage"
    show-edges
    :default-page="1"
    @update:page="emits('update:page', $event)"
  >
    <pagination-list
      v-slot="{ items }"
      class="pagination__list"
    >
      <pagination-first class="pagination__button">
        <vue-feather type="chevrons-left" />
      </pagination-first>
      <pagination-prev
        :style="{ marginRight: 16 }"
        class="pagination__button"
      >
        <vue-feather type="chevron-left" />
      </pagination-prev>
      <template v-for="(page, index) in items">
        <pagination-list-item
          v-if="page.type === 'page'"
          :key="index"
          class="pagination__button"
          :value="page.value"
        >
          {{ page.value }}
        </pagination-list-item>
        <pagination-ellipsis
          v-else
          :key="page.type"
          :index="index"
          class="pagination__ellipsis"
        >
          &#8230;
        </pagination-ellipsis>
      </template>
      <pagination-next
        :style="{ marginLeft: 16 }"
        class="pagination__button"
      >
        <vue-feather type="chevron-right" />
      </pagination-next>
      <pagination-last class="pagination__button">
        <vue-feather type="chevrons-right" />
      </pagination-last>
    </pagination-list>
  </pagination-root>
</template>

<style scoped>
.pagination__button {
  text-align: center;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 0.25rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.pagination__button:disabled {
  opacity: 0.5;
}

.pagination__button:hover {
  background-color: rgb(255 255 255 / 0.1);
}

.pagination__button[data-selected] {
  background-color: var(--accent);
  color: var(--black-a11);
}

.pagination__ellipsis {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
}

.pagination__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgb(255 255 255);
}
</style>
