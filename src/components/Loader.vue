<script setup>
import { computed } from 'vue'

const props = defineProps({
  loaderStyle: {
    type: String,
    default: 'wave'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const size = computed(() => {
  if (props.size === 'small') {
    return { width: '24px', height: '30px' }
  } else if (props.size === 'medium') {
    return { width: '48px', height: '60px' }
  }

  return { width: '96px', height: '120px' }
})
</script>

<template>
  <div class="loader">
    <svg
      v-if="loaderStyle === 'wave'"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="size.width"
      :height="size.height"
      viewBox="0 0 24 30"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <rect
        x="0"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="10"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="20"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
    <svg
      v-else-if="loaderStyle === 'vertical'"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="size.width"
      :height="size.height"
      viewBox="0 0 24 30"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <rect
        x="0"
        y="0"
        width="4"
        height="20"
        fill="#333"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="7"
        y="0"
        width="4"
        height="20"
        fill="#333"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="14"
        y="0"
        width="4"
        height="20"
        fill="#333"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<style scoped>
.loader svg rect,
.loader svg path {
  fill: var(--accent);
}
</style>
