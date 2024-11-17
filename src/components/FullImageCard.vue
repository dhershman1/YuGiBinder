<script setup>
defineProps({
  item: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div
    class="full-img__card"
    :style="{ 'background-image': `url(${item.thumbnail})` }"
  >
    <div
      class="full-img__card__content"
      @click="() => $router.push(`/binders/${item.id}`)"
    >
      <section class="full-img__card__pills">
        <span
          v-for="tag of item.tags.slice(0, 2)"
          :key="tag"
          class="pill tag__badge"
        >
          {{ tag }}
        </span>
      </section>
      <section class="full-img__card__details">
        <p class="full-img__card__title text-truncate">{{ item.name }}</p>
        <div class="full-img__card__stats">
          <slot name="stats" />
        </div>
      </section>
    </div>
  </div>
</template>
