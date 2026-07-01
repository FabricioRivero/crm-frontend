<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useClientesStore } from '../stores/clientes';
import { useCitasStore } from '../stores/citas';
import EstadoBadge from '../components/EstadoBadge.vue';

const clientesStore = useClientesStore();
const citasStore = useCitasStore();

onMounted(() => {
  clientesStore.cargarClientes();
  citasStore.cargarCitas();
});

const proximasCitas = computed(() => citasStore.ordenadasPorFecha.slice(0, 5));

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString('es-BO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const tarjetas = computed(() => [
  { label: 'Clientes totales', valor: clientesStore.total, acento: 'text-brand-600' },
  { label: 'Clientes VIP', valor: clientesStore.clientesVip, acento: 'text-amber-600' },
  { label: 'Citas pendientes', valor: citasStore.pendientes, acento: 'text-amber-600' },
  { label: 'Citas confirmadas', valor: citasStore.confirmadas, acento: 'text-blue-600' },
]);
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-xs font-medium uppercase tracking-wide text-brand-600">Panel general</p>
      <h1 class="font-display text-2xl font-semibold text-slate-900">
        Buen día. Así está tu negocio hoy.
      </h1>
    </header>

    <section class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div
        v-for="tarjeta in tarjetas"
        :key="tarjeta.label"
        class="rounded-xl border border-slate-200 bg-white p-4"
      >
        <p class="text-xs text-slate-500">{{ tarjeta.label }}</p>
        <p class="mt-1 font-display text-3xl font-semibold" :class="tarjeta.acento">
          {{ tarjeta.valor }}
        </p>
      </div>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 class="font-display text-sm font-semibold text-slate-900">Próximas citas</h2>
        <RouterLink to="/citas" class="text-xs font-medium text-brand-600 hover:underline">
          Ver todas →
        </RouterLink>
      </div>

      <div v-if="citasStore.cargando" class="px-5 py-8 text-center text-sm text-slate-400">
        Cargando citas…
      </div>
      <div v-else-if="citasStore.error" class="px-5 py-8 text-center text-sm text-rose-600">
        {{ citasStore.error }}
      </div>
      <div v-else-if="proximasCitas.length === 0" class="px-5 py-8 text-center text-sm text-slate-400">
        Todavía no hay citas agendadas. Empieza en la sección Citas.
      </div>
      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="cita in proximasCitas"
          :key="cita.id"
          class="flex items-center justify-between px-5 py-3 text-sm"
        >
          <div>
            <p class="font-medium text-slate-800">{{ formatearFecha(cita.fechaHora) }}</p>
            <p class="text-xs text-slate-400">Cliente {{ cita.clienteId.slice(0, 8) }}</p>
          </div>
          <EstadoBadge :estado="cita.estado" />
        </li>
      </ul>
    </section>
  </div>
</template>
