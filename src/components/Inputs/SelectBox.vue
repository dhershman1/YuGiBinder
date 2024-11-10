<script setup>
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue'
const modelValue = defineModel()
defineProps({
  groups: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <select-root v-model="modelValue">
    <select-trigger class="select__trigger">
      <select-value>
        {{ modelValue }}
      </select-value>
      <vue-feather type="chevron-down" />
    </select-trigger>
    <select-portal>
      <select-content class="select__content">
        <select-viewport class="select__viewport">
          <template
            v-for="group in groups"
            :key="group.label"
          >
            <select-label class="select__label">{{ group.label }}</select-label>
            <select-group>
              <select-item
                class="select__item"
                v-for="item in group.items"
                :key="item"
                :value="item"
              >
                <select-item-indicator class="select__item__indicator" />
                <select-item-text>
                  {{ item }}
                </select-item-text>
              </select-item>
            </select-group>
            <select-separator
              v-if="groups.length > 1"
              class="select__separator"
            />
          </template>
        </select-viewport>
      </select-content>
    </select-portal>
  </select-root>
</template>
