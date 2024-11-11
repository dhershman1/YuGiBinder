<script setup>
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
import { usePaginationStore } from '@/stores/pagination'

const paginationStore = usePaginationStore()

const emits = defineEmits(['update:page'])
defineProps({
  total: Number,
  defaultPage: Number
})
</script>

<template>
  <PaginationRoot
    :total="paginationStore.totalPages"
    :sibling-count="1"
    show-edges
    :default-page="paginationStore.currentPage"
    @update:page="emits('update:page', $event)"
  >
    <PaginationList
      v-slot="{ items }"
      class="PaginationList"
    >
      <PaginationFirst class="Button">
        <vue-feather type="chevrons-left" />
      </PaginationFirst>
      <PaginationPrev
        :style="{ marginRight: 16 }"
        class="Button"
      >
        <vue-feather type="chevron-left" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="Button"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="PaginationEllipsis"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext
        :style="{ marginLeft: 16 }"
        class="Button"
      >
        <vue-feather type="chevron-right" />
      </PaginationNext>
      <PaginationLast class="Button">
        <vue-feather type="chevrons-right" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>

<style scoped>
.Button {
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

.Button:disabled {
  opacity: 0.5;
}

.Button:hover {
  background-color: rgb(255 255 255 / 0.1);
}

.Button[data-selected] {
  background-color: var(--accent);
  color: var(--black-a11);
}

.PaginationEllipsis {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
}

.PaginationList {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgb(255 255 255);
}
</style>
