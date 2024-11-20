<script setup>
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger
} from 'radix-vue'

const emits = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <alert-dialog-root>
    <alert-dialog-trigger>
      <slot name="trigger" />
    </alert-dialog-trigger>
    <alert-dialog-portal>
      <alert-dialog-overlay class="alert__overlay" />
      <alert-dialog-content class="alert__content">
        <alert-dialog-title class="alert__title">
          <slot name="title">Are you sure?</slot>
        </alert-dialog-title>
        <alert-dialog-description class="alert__description">
          <slot name="description">This action cannot be undone.</slot>
        </alert-dialog-description>
        <div class="alert__btn-group">
          <alert-dialog-cancel
            class="btn btn__secondary"
            @click="emits('cancel')"
          >
            <slot name="cancel">Cancel</slot>
          </alert-dialog-cancel>
          <alert-dialog-action
            class="btn btn__danger"
            @click="emits('confirm')"
          >
            <slot name="action">Confirm</slot>
          </alert-dialog-action>
        </div>
      </alert-dialog-content>
    </alert-dialog-portal>
  </alert-dialog-root>
</template>

<style scoped>
.alert__overlay {
  background-color: var(--overlay);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.alert__content {
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.alert__content:focus {
  outline: none;
}

.alert__title {
  margin: 0;
  color: var(--warmgrey);
  font-size: 18px;
  font-weight: 500;
}

.alert__description {
  margin-bottom: 1.1rem;
  color: var(--warmgrey);
  font-size: 14px;
  line-height: 1.5;
}

.alert__btn-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
