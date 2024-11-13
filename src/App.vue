<script setup>
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

const { width } = useWindowSize()
const authStore = useAuthStore()
const { loginWithRedirect } = useAuth0()

function login() {
  loginWithRedirect()
}
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
          <NavigationMenuItem>
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
                <li v-if="!authStore.token">
                  <NavigationMenuLink as-child>
                    <button
                      class="ListItemLink"
                      aria-label="Login"
                      aria-type="button"
                      @click="login"
                    >
                      <div class="ListItemHeading">Login</div>
                      <p class="ListItemText">Login to the application if you already have an account.</p>
                    </button>
                  </NavigationMenuLink>
                </li>
                <li v-if="!authStore.token">
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/register"
                    >
                      <div class="ListItemHeading">Register</div>
                      <p class="ListItemText">Register a new account if you don't have one.</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li v-if="authStore.token">
                  <NavigationMenuLink as-child>
                    <router-link
                      class="ListItemLink"
                      to="/register"
                    >
                      <div class="ListItemHeading">My Account</div>
                      <p class="ListItemText">View your account</p>
                    </router-link>
                  </NavigationMenuLink>
                </li>
                <li v-if="authStore.token">
                  <NavigationMenuLink as-child>
                    <span
                      class="ListItemLink"
                      @click="authStore.logout"
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
                <li v-if="authStore.token && authStore.hasAccess('add:binder')">
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
                <li v-if="authStore.token">
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
