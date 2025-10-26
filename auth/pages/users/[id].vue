<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUsersApi } from '~/composables/useUsers'
const route = useRoute()
const router = useRouter()
const { get, update, remove } = useUsersApi()
const id = route.params.id as string
const { data: user } = await useAsyncData(['user', id], () => get(id))
let form = reactive({ name: user?.name || '', email: user?.email || '' })

const onUpdate = async () => {
  await update(id, form)
  await router.push('/users')
}

const onDelete = async () => {
  if (!confirm('Delete user?')) return
  await remove(id)
  await router.push('/users')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Edit user</h1>
    <div class="bg-white p-4 rounded shadow">
      <label class="block mb-2">Name
        <input v-model="form.name" class="w-full border px-3 py-2 rounded" />
      </label>
      <label class="block mb-2">Email
        <input v-model="form.email" class="w-full border px-3 py-2 rounded" />
      </label>
      <div class="flex gap-2 mt-4">
        <button @click="onUpdate" class="px-3 py-2 bg-green-600 text-white rounded">Save</button>
        <button @click="onDelete" class="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
        <NuxtLink to="/users" class="px-3 py-2 bg-slate-200 rounded">Back</NuxtLink>
      </div>
    </div>
  </div>
</template>
