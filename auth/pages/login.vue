<script setup lang="ts">
import { useApiParty } from '~/composables/useApiParty'
const api = useApiParty()
const form = reactive({ token: '' })
const onSet = () => {
  api.setToken(form.token || null)
  alert('Token saved to localStorage')
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Set API token</h1>
    <div class="bg-white p-4 rounded shadow">
      <label class="block mb-2">Token
        <input v-model="form.token" class="w-full border px-3 py-2 rounded" />
      </label>
      <div class="flex gap-2 mt-4">
        <button @click="onSet" class="px-3 py-2 bg-blue-600 text-white rounded">Save token</button>
        <NuxtLink to="/" class="px-3 py-2 bg-slate-200 rounded">Back</NuxtLink>
      </div>
    </div>
  </div>
</template>
