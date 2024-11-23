<script setup>
defineProps({
  position: {
    type: Number,
    required: false
  }
})
</script>

<template>
  <div class="placeholder">
    <img
      class="placeholder__img"
      src="/imgs/ygo_card_back.png"
      alt="placeholder"
    />
    <span class="placeholder__text">
      <vue-feather
        type="plus-circle"
        size="50"
      />
    </span>
  </div>
</template>

<style scoped>
.placeholder {
  width: 100%;
  height: 100%;
}

.placeholder__text {
  position: absolute;
  transition: all 0.3s ease;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
  color: var(--white);
}

.placeholder:hover {
  cursor: pointer;
}

.placeholder:hover .placeholder__text {
  transform: translate(-50%, -50%) scale(1.1);
  color: var(--accent);
}

.placeholder__img {
  position: relative;
  width: 100%;
  opacity: 0.7;
}
</style>
