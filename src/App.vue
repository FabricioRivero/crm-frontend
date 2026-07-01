<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();

const enlaces = [
  { to: '/', label: 'Panel', icon: 'home' },
  { to: '/clientes', label: 'Clientes', icon: 'users' },
  { to: '/citas', label: 'Citas', icon: 'calendar' },
];
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <aside class="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 sm:flex">
      <div class="mb-8 flex items-center gap-2 px-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-display text-sm font-bold text-white">
          CT
        </div>
        <div>
          <p class="font-display text-sm font-semibold text-slate-900">Citas CRM</p>
          <p class="text-[11px] text-slate-400">SIS-113</p>
        </div>
      </div>

      <nav class="flex flex-1 flex-col gap-1">
        <RouterLink
          v-for="enlace in enlaces"
          :key="enlace.to"
          :to="enlace.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            route.path === enlace.to
              ? 'bg-brand-50 text-brand-700'
              : 'text-slate-600 hover:bg-slate-100'
          "
        >
          <svg v-if="enlace.icon === 'home'" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-3h2v3a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <svg v-else-if="enlace.icon === 'users'" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <svg v-else class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 6H4v8h12V8z" clip-rule="evenodd" />
          </svg>
          {{ enlace.label }}
        </RouterLink>
      </nav>

      <div class="rounded-lg bg-slate-50 px-3 py-2.5 text-[11px] text-slate-400">
        Backend en
        <code class="text-slate-500">localhost:3000</code>
      </div>
    </aside>

    <div class="flex min-h-screen flex-1 flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-display text-xs font-bold text-white">
            CT
          </div>
          <p class="font-display text-sm font-semibold">Citas CRM</p>
        </div>
      </header>

      <nav class="flex justify-around border-b border-slate-200 bg-white py-2 sm:hidden">
        <RouterLink
          v-for="enlace in enlaces"
          :key="enlace.to"
          :to="enlace.to"
          class="rounded-md px-3 py-1.5 text-xs font-medium"
          :class="route.path === enlace.to ? 'bg-brand-50 text-brand-700' : 'text-slate-500'"
        >
          {{ enlace.label }}
        </RouterLink>
      </nav>

      <main class="flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
