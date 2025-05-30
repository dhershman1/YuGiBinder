<script setup>
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from 'radix-vue'

defineProps({
  icon: {
    type: String,
    default: 'tag'
  },
  items: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['click'])

const toggleState = ref(false)
</script>

<template>
  <dropdown-menu-root v-model:open="toggleState">
    <dropdown-menu-trigger
      class="IconButton"
      aria-label="View Tags"
    >
      <vue-feather :type="icon" />
    </dropdown-menu-trigger>

    <dropdown-menu-portal>
      <dropdown-menu-content
        class="DropdownMenuContent"
        :side-offset="5"
      >
        <dropdown-menu-item
          v-for="item in items"
          :key="item"
          :value="item"
          class="DropdownMenuItem"
          @click="emit('click', item)"
        >
          {{ item }}
        </dropdown-menu-item>
        <dropdown-menu-arrow class="DropdownMenuArrow" />
      </dropdown-menu-content>
    </dropdown-menu-portal>
  </dropdown-menu-root>
</template>

<style scoped>
:deep(.DropdownMenuContent),
.DropdownMenuSubContent {
  min-width: 200px;
  background-color: var(--white);
  border-radius: 6px;
  padding: 5px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
:deep(.DropdownMenuContent)[data-side='top'],
.DropdownMenuSubContent[data-side='top'] {
  animation-name: slideDownAndFade;
}
:deep(.DropdownMenuContent)[data-side='right'],
.DropdownMenuSubContent[data-side='right'] {
  animation-name: slideLeftAndFade;
}
:deep(.DropdownMenuContent)[data-side='bottom'],
.DropdownMenuSubContent[data-side='bottom'] {
  animation-name: slideUpAndFade;
}
:deep(.DropdownMenuContent)[data-side='left'],
.DropdownMenuSubContent[data-side='left'] {
  animation-name: slideRightAndFade;
}

:deep(.DropdownMenuArrow) {
  fill: var(--white);
}

.DropdownMenuItem,
.DropdownMenuCheckboxItem,
.DropdownMenuRadioItem,
.DropdownMenuSubTrigger {
  font-size: 13px;
  line-height: 1;
  color: var(--black);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
}
.DropdownMenuSubTrigger[data-state='open'] {
  background-color: var(--lightgrey);
  color: var(--black);
}
.DropdownMenuItem[data-disabled],
.DropdownMenuCheckboxItem[data-disabled],
.DropdownMenuRadioItem[data-disabled],
.DropdownMenuSubTrigger[data-disabled] {
  color: var(--warmgrey);
  pointer-events: none;
}
.DropdownMenuItem[data-highlighted],
.DropdownMenuCheckboxItem[data-highlighted],
.DropdownMenuRadioItem[data-highlighted],
.DropdownMenuSubTrigger[data-highlighted] {
  background-color: var(--shadow);
  color: var(--black);
}

.DropdownMenuLabel {
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--warmgrey);
}

.DropdownMenuSeparator {
  height: 1px;
  background-color: var(--secondary);
  margin: 5px;
}

.DropdownMenuItemIndicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.DropdownMenuArrow {
  fill: var(--white);
}

.IconButton {
  font-family: inherit;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  background-color: var(--white);
  box-shadow: 0 2px 10px var(--shadow);
  transition: all 0.1s ease;
}
.IconButton:hover {
  background-color: var(--accent);
}
.IconButton:focus {
  box-shadow: 0 0 0 2px var(--accent);
}

.RightSlot {
  margin-left: auto;
  padding-left: 20px;
  color: var(--warmgrey);
}
[data-highlighted] > .RightSlot {
  color: var(--white);
}
[data-disabled] .RightSlot {
  color: var(--warmgrey);
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
