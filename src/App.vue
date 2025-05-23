<script setup>
import { watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from 'radix-vue'
import brand from '@/assets/brand.svg'
import Socials from '@/components/Socials.vue'
import { useWindowSize } from '@vueuse/core'
import { useAuthStore } from './stores/auth'
import { useAuth0 } from '@auth0/auth0-vue'

import GlobalToast from './components/GlobalToast.vue'

const { width } = useWindowSize()
const authStore = useAuthStore()
const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

async function login() {
  await loginWithRedirect()
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
  authStore.user = null
  authStore.userId = null
}

watch(user, (newUser) => {
  if (newUser !== undefined) {
    authStore.user = newUser
    authStore.userId = newUser.sub
  } else {
    authStore.user = null
    authStore.userId = null
  }
})
</script>

<template>
  <header>
    <section class="navbar">
      <div class="logo">
        <router-link
          class="brand__wrapper"
          to="/"
        >
          <span class="brand">
            <brand />
          </span>
          <span v-if="width > 768"> YuGiBinder </span>
        </router-link>
      </div>
      <NavigationMenuRoot class="NavigationMenuRoot">
        <NavigationMenuList class="NavigationMenuList">
          <NavigationMenuItem v-if="width > 768">
            <NavigationMenuLink
              class="NavigationMenuLink"
              as-child
            >
              <router-link
                class="ListItemLink"
                to="/"
              >
                Home
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              class="NavigationMenuLink"
              as-child
            >
              <router-link
                class="ListItemLink"
                to="/about"
              >
                About
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="NavigationMenuTrigger">
              Account
              <vue-feather
                type="chevron-down"
                class="CaretDown"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent class="NavigationMenuContent">
              <ul class="List one">
                <li v-if="!isAuthenticated">
                  <NavigationMenuLink as-child>
                    <button
                      class="ListItemLink"
                      aria-label="Login"
                      aria-type="button"
                      @click="login"
                    >
                      <div class="ListItemHeading">Login/Signup</div>
                      <p class="ListItemText">Login or create an account for yugibinder.</p>
                    </button>
                  </NavigationMenuLink>
                </li>
                <li v-if="isAuthenticated">
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/my-account"
                    >
                      <div class="ListItemHeading">My Account</div>
                      <p class="ListItemText">View your account</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li v-if="isAuthenticated">
                  <NavigationMenuLink as-child>
                    <span
                      class="ListItemLink"
                      @click="handleLogout"
                    >
                      <div class="ListItemHeading">Logout</div>
                      <p class="ListItemText">Logout of the application</p>
                    </span>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="NavigationMenuTrigger">
              Binders
              <vue-feather
                type="chevron-down"
                class="CaretDown"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent class="NavigationMenuContent">
              <ul class="List one">
                <li>
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/binders"
                    >
                      <div class="ListItemHeading">See All</div>
                      <p class="ListItemText">See and sift through all the binders on YuGiBinder.</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      class="ListItemLink"
                      href="/binder/random"
                    >
                      <div class="ListItemHeading">Random Binder</div>
                      <p class="ListItemText">Load up a random binder.</p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li v-if="isAuthenticated">
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/binder/create"
                    >
                      <div class="ListItemHeading">Create</div>
                      <p class="ListItemText">Create a new Binder.</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li v-if="isAuthenticated">
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/my-binders"
                    >
                      <div class="ListItemHeading">My Binders</div>
                      <p class="ListItemText">Checkout the binders you've made.</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="NavigationMenuTrigger">
              Cards
              <vue-feather
                type="chevron-down"
                class="CaretDown"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent class="NavigationMenuContent">
              <ul class="List one">
                <li>
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/card-catalog"
                    >
                      <div class="ListItemHeading">Card Catalog</div>
                      <p class="ListItemText">Go to the Card Catalog</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      class="ListItemLink"
                      href="/card/random"
                    >
                      <div class="ListItemHeading">Random Card</div>
                      <p class="ListItemText">Click to find a random card.</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuIndicator class="NavigationMenuIndicator">
            <div class="Arrow" />
          </NavigationMenuIndicator>
        </NavigationMenuList>

        <div class="ViewportPosition">
          <NavigationMenuViewport class="NavigationMenuViewport" />
        </div>
      </NavigationMenuRoot>
    </section>
  </header>
  <main>
    <global-toast />
    <router-view />
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
.navbar {
  display: flex;
  align-items: center;
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
    justify-content: end;
  }
}
</style>
