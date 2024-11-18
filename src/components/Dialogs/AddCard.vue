<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from 'radix-vue'

defineProps({
  dialogTitle: String,
  description: String
})

const emits = defineEmits(['add'])
</script>

<template>
  <dialog-root>
    <dialog-trigger>
      <slot name="trigger" />
    </dialog-trigger>
    <dialog-portal>
      <dialog-overlay class="DialogOverlay" />
      <dialog-content class="DialogContent">
        <dialog-title class="DialogTitle"> {{ dialogTitle }} </dialog-title>
        <dialog-description class="DialogDescription">
          {{ description }}
        </dialog-description>
        <fieldset class="Fieldset">
          <label
            class="Label"
            for="name"
          >
            Name
          </label>
          <input
            id="name"
            class="Input"
            defaultValue="Pedro Duarte"
          />
        </fieldset>
        <fieldset class="Fieldset">
          <label
            class="Label"
            for="username"
          >
            Username
          </label>
          <input
            id="username"
            class="Input"
            defaultValue="@peduarte"
          />
        </fieldset>
        <div :style="{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }">
          <dialog-close as-child>
            <button
              @click="emits('add')"
              class="btn btn__primary"
            >
              Add
            </button>
          </dialog-close>
        </div>
        <dialog-close
          class="IconButton"
          aria-label="Close"
        >
          <vue-feather type="x" />
        </dialog-close>
      </dialog-content>
    </dialog-portal>
  </dialog-root>
</template>
