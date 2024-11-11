<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const router = useRouter()
const authStore = useAuthStore()

const loginUser = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value })
    router.replace('/')
  } catch (err) {
    // Show an error on the UI
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="loginUser">
    <div>
      <label for="username">Username:</label>
      <input
        id="username"
        class="form-control"
        v-model="username"
        type="text"
        required
      />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        id="password"
        class="form-control"
        v-model="password"
        type="password"
        required
      />
    </div>
    <button
      class="btn btn__primary"
      type="submit"
    >
      Login
    </button>
  </form>
</template>

<style scoped>
.form-control {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
