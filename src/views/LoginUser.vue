<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import Card from '@/components/Card.vue'

const username = ref('')
const password = ref('')
const passConfirm = ref('')

const router = useRouter()
const authStore = useAuthStore()

async function loginUser() {
  try {
    await authStore.login({ username: username.value, password: password.value })
    router.replace('/')
  } catch (err) {
    // Show an error on the UI
    console.error(err)
  }
}

async function registerUser() {
  if (password.value !== passConfirm.value) {
    console.error('Passwords do not match')
    return
  }

  try {
    await authStore.register({ username: username.value, password: password.value })
    router.replace('/')
  } catch (err) {
    // Show an error on the UI
    console.error(err)
  }
}
</script>

<template>
  <section class="wrapper">
    <card>
      <template #main>
        <tabs-root
          default-value="login"
          class="tabs__root"
        >
          <tabs-list
            class="tabs__list"
            aria-label="Login or register"
          >
            <tabs-indicator class="tabs__indicator">
              <div class="indicator" />
            </tabs-indicator>
            <tabs-trigger
              class="tabs__trigger"
              value="login"
            >
              Login
            </tabs-trigger>
            <tabs-trigger
              class="tabs__trigger"
              value="register"
            >
              Register
            </tabs-trigger>
          </tabs-list>
          <tabs-content
            class="tabs__content"
            value="login"
          >
            <p class="text">Enter your username and password to login.</p>
            <form @submit.prevent="loginUser">
              <fieldset class="fieldset">
                <label for="username">Username:</label>
                <input
                  id="username"
                  class="form-control"
                  v-model="username"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset class="fieldset">
                <label for="password">Password:</label>
                <input
                  id="password"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
              </fieldset>
              <button
                class="btn btn__primary"
                type="submit"
              >
                Login
              </button>
            </form>
          </tabs-content>
          <tabs-content
            class="tabs__content"
            value="register"
          >
            <p class="text">Create a username and password to register.</p>
            <form @submit.prevent="registerUser">
              <fieldset class="fieldset">
                <label for="username">Username:</label>
                <input
                  id="username"
                  class="form-control"
                  v-model="username"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset class="fieldset">
                <label for="password">Password:</label>
                <input
                  id="password"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
              </fieldset>
              <fieldset class="fieldset">
                <label for="password">Confirm Password:</label>
                <input
                  id="password"
                  class="form-control"
                  v-model="passConfirm"
                  type="password"
                  required
                />
              </fieldset>
              <button
                class="btn btn__primary"
                type="submit"
              >
                Register
              </button>
            </form>
          </tabs-content>
        </tabs-root>
      </template>
    </card>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper .card {
  color: var(--black);
}

.form-control {
  width: 95%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid var(--white);
  color: var(--black);
  background-color: var(--white);
  border-radius: 0.25rem;
  border-color: var(--white-dark);
}

.form-control:focus {
  outline: none;
  border-color: var(--accent);
}

.text {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--warmgrey);
  font-size: 15px;
  line-height: 1.5;
}

.fieldset {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media screen and (max-width: 768px) {
  .wrapper {
    width: 100%;
  }
}
</style>
