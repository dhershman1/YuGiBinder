<script setup>
import CardStack from '@/components/CardStack.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="about">
    <section class="centr">
      <h2>About YuGiBinder</h2>
      <p>
        YuGiBinder is a web application that allows users to create binders to store their
        <a
          href="https://www.yugioh-card.com/en/"
          target="_blank"
          >Yu-Gi-Oh!
        </a>
        cards. Users can create, read, update, and delete binders and cards. Users can also create, read, update, and
        delete decks. Users can add cards to decks and remove cards from decks. Users can also search for cards by name
        and add cards to binders.
      </p>
      <p class="mt-2">
        <a
          href="https://www.yugioh-card.com/en/"
          target="_blank"
        >
          Yu-Gi-Oh!
        </a>
        and its associated properties, including card names and images, are © {{ currentYear }} Studio Dice/SHUEISHA,
        TV TOKYO, KONAMI. Yugioh Card Prices is not produced by, endorsed by, or affiliated with Studio Dice, SHUEISHA,
        TV TOKYO, or KONAMI.
      </p>
    </section>
    <section class="centr">
      <card-stack />
    </section>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 100vh;
}

.about h2 {
  text-align: center;
}

.centr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mt-2 {
  margin-top: 2rem;
}

@media screen and (max-width: 768px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
