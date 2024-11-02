<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import brand from '@/assets/brand.svg'
import Socials from '@/components/Socials.vue'

const showMobile = ref(false)

function showMenu() {
  showMobile.value = !showMobile.value
}
</script>

<template>
  <header>
    <vue-feather
      type="menu"
      @click="showMenu()"
    />
    <nav :class="['nav-content', showMobile ? 'open-menu' : 'closed-menu']">
      <div class="logo">
        <router-link
          class="brand__wrapper"
          to="/"
        >
          <span class="brand">
            <brand />
          </span>
          YuGiBinder
        </router-link>
      </div>
      <ul class="nav-items">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/binders">Binders</router-link>
        </li>
        <li>
          <router-link to="/decks">Decks</router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p>
      Made With ❤️ by
      <a
        class="link"
        href="https://github.com/dhershman1"
        target="_blank"
        >Dustin Hershman</a
      >
    </p>
    <socials />
  </footer>
</template>

<style scoped>
main {
  display: grid;
}

i {
  color: var(--white);
  font-size: 30px;
  display: none;
}

.logo {
  display: inline-block;
  color: var(--accent);
  font-size: 30px;
}

.vue-feather--menu {
  color: var(--white);
}

@media screen and (max-width: 768px) {
  i {
    display: flex;
    padding: 1rem;
    justify-content: end;
  }
}
</style>
