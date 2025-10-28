<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUsersApi } from '~/composables/useUsers'
const router = useRouter()
const { create } = useUsersApi()
const form = reactive({ name: '', email: '' })

const onSubmit = async () => {
  await create(form)
  await router.push('/users')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Add user</h1>
    <div class="bg-white p-4 rounded shadow">
      <label class="block mb-2">Name
        <input v-model="form.name" class="w-full border px-3 py-2 rounded" />
      </label>
      <label class="block mb-2">Email
        <input v-model="form.email" class="w-full border px-3 py-2 rounded" />
      </label>
      <div class="flex gap-2 mt-4">
        <button @click="onSubmit" class="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        <NuxtLink to="/users" class="px-3 py-2 bg-slate-200 rounded">Back</NuxtLink>
      </div>
    </div>
  </div>
</template>
