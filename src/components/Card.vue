<script setup>
import { onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

const props = defineProps({
  goToLink: {
    type: String,
    required: false,
    default: ''
  },
  docLink: {
    type: String,
    required: false,
    default: ''
  },
  icon: {
    type: String,
    default: 'external-link'
  }
})

const animation = (i) => ({
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.6
  },
  visibleOnce: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delay: 50 * i
    }
  }
})

onMounted(() => {
  const mediaItems = document.querySelectorAll('.media-item')

  mediaItems.forEach((mediaItem, i) => {
    useMotion(mediaItem, animation(i))
  })
})
</script>

<template>
  <div class="card media-item">
    <section class="card__actions">
      <a
        v-if="props.goToLink"
        :href="props.goToLink"
        target="_blank"
      >
        <vue-feather :type="icon" />
      </a>
      <a
        v-if="props.docLink"
        :href="props.docLink"
        target="_blank"
      >
        <vue-feather type="book-open" />
      </a>
    </section>
    <section class="card__main">
      <slot name="main" />
    </section>
    <section class="card__text">
      <slot name="text" />
    </section>
  </div>
</template>
