<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-800 text-white shadow">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold">CRM Citas</span>
          </div>
          <div class="flex space-x-4">
            <RouterLink to="/" class="px-3 py-2 rounded hover:bg-blue-700" active-class="bg-blue-700">Dashboard</RouterLink>
            <RouterLink to="/clientes" class="px-3 py-2 rounded hover:bg-blue-700" active-class="bg-blue-700">Clientes</RouterLink>
            <RouterLink to="/citas" class="px-3 py-2 rounded hover:bg-blue-700" active-class="bg-blue-700">Citas</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>