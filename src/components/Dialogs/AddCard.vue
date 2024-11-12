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
  <DialogRoot>
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="DialogOverlay" />
      <DialogContent class="DialogContent">
        <DialogTitle class="DialogTitle"> {{ dialogTitle }} </DialogTitle>
        <DialogDescription class="DialogDescription">
          {{ description }}
        </DialogDescription>
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
          <DialogClose as-child>
            <button
              @click="emits('add')"
              class="btn btn__primary"
            >
              Add
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="IconButton"
          aria-label="Close"
        >
          <vue-feather type="x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
