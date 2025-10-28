<script setup lang="ts">
import { useUsersApi } from '~/composables/useUsers'
const { list } = useUsersApi()
const { data } = await useAsyncData('users', () => list())
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Users</h1>
    <NuxtLink to="/add-user" class="inline-block mb-4 px-3 py-2 bg-blue-600 text-white rounded">Add user</NuxtLink>
    <table class="min-w-full bg-white shadow rounded">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in data" :key="u.id" class="border-t">
          <td class="px-4 py-2">{{ u.id }}</td>
          <td class="px-4 py-2">{{ u.name }}</td>
          <td class="px-4 py-2">{{ u.email }}</td>
          <td class="px-4 py-2">
            <NuxtLink :to="`/users/${u.id}`" class="text-blue-600">View</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
