<script setup>
import { ToastAction, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'

const open = defineModel()
defineProps({
  title: String,
  duration: {
    type: Number,
    default: 2000
  },
  actionAlt: {
    type: String,
    default: 'Alt Text'
  }
})
</script>

<template>
  <ToastProvider>
    <slot name="trigger" />

    <ToastRoot
      :duration="duration"
      v-model:open="open"
      class="ToastRoot"
    >
      <ToastTitle class="ToastTitle"> {{ title }} </ToastTitle>
      <ToastDescription
        class="ToastDescription"
        as-child
      >
        <slot name="description" />
      </ToastDescription>
      <ToastAction
        class="ToastAction"
        :alt-text="actionAlt"
      >
        <slot name="action" />
      </ToastAction>
    </ToastRoot>
    <ToastViewport class="ToastViewport" />
  </ToastProvider>
</template>

<style>
.ToastViewport {
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}

.ToastRoot {
  background-color: var(--white);
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
}
.ToastRoot[data-state='open'] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ToastRoot[data-state='closed'] {
  animation: hide 100ms ease-in;
}
.ToastRoot[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}
.ToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.ToastRoot[data-swipe='end'] {
  animation: swipeOut 100ms ease-out;
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
}

.ToastTitle {
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--slategrey);
  font-size: 15px;
}

.ToastDescription {
  grid-area: description;
  margin: 0;
  color: var(--warmgrey);
  font-size: 13px;
  line-height: 1.3;
}

.ToastAction {
  grid-area: action;
}
</style>
