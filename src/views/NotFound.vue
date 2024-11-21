<script setup>
import CardStack from '@/components/CardStack.vue'
</script>

<template>
  <div class="not-found">
    <section class="content">
      <div class="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <div class="action-link-wrap">
          <router-link
            to="/"
            class="action-link btn btn__primary"
            >Go to Home</router-link
          >
        </div>
      </div>
    </section>
    <section class="ygo-cards">
      <card-stack />
    </section>
  </div>
</template>

<style scoped>
.not-found {
  display: grid;
  grid-template-columns: 2fr 3fr;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.message-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.message-box h1 {
  font-size: 10rem;
  margin: 0;
}

.ygo-cards {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .not-found {
    grid-template-columns: 1fr;
  }

  .action-link-wrap {
    margin-top: 1rem;
  }

  .action-link {
    padding: 1.5rem;
  }
}
</style>
