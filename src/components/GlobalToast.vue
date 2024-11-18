<script setup>
import { useToastStore } from '@/stores/toasts'

const toastStore = useToastStore()
</script>

<template>
  <transition-group
    name="toast"
    tag="div"
    class="toast-container"
  >
    <div
      v-for="(toast, index) in toastStore.toasts"
      :key="index"
      class="toast"
      :class="toast.type"
    >
      {{ toast.message }}
    </div>
  </transition-group>
</template>

<style>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  color: var(--black);
  font-weight: bold;
  background-color: var(--white);
  border-top: 6px solid;
}

/* Toast Types */
.toast.success {
  border-color: var(--success);
}

.toast.error {
  border-color: var(--danger);
}

.toast.info {
  border-color: var(--info);
}

.toast.warning {
  border-color: var(--warning);
}

/* Transition Animations */
.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.toast-enter-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.toast-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.toast-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.toast-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
