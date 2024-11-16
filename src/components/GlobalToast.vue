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
  color: white;
  font-weight: bold;
}

/* Toast Types */
.toast.success {
  background-color: var(--success);
}

.toast.error {
  background-color: var(--danger);
}

.toast.info {
  background-color: var(--info);
}

.toast.warning {
  background-color: var(--warning);
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
