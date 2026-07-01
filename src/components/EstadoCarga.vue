<script setup lang="ts">
defineProps<{
  cargando: boolean;
  error: string | null;
  vacio?: boolean;
  mensajeVacio?: string;
}>();
</script>

<template>
  <div v-if="cargando" class="flex items-center justify-center gap-3 py-16 text-slate-500">
    <svg class="h-5 w-5 animate-spin text-brand-500" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span class="text-sm">Cargando…</span>
  </div>

  <div
    v-else-if="error"
    class="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800"
  >
    <svg class="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.28 11.18c.75 1.334-.213 2.98-1.742 2.98H3.72c-1.53 0-2.493-1.646-1.743-2.98l6.28-11.18zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.5a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
        clip-rule="evenodd"
      />
    </svg>
    <div class="text-sm">
      <p class="font-medium">No se pudo completar la acción</p>
      <p class="text-rose-700">{{ error }}</p>
    </div>
  </div>

  <div
    v-else-if="vacio"
    class="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500"
  >
    <p class="text-sm">{{ mensajeVacio ?? 'Todavía no hay nada aquí' }}</p>
  </div>

  <slot v-else />
</template>
