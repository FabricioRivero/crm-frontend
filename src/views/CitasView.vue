<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useCitasStore } from '../stores/citas';
import { useClientesStore } from '../stores/clientes';
import EstadoBadge from '../components/EstadoBadge.vue';
import EstadoCarga from '../components/EstadoCarga.vue';

const citasStore = useCitasStore();
const clientesStore = useClientesStore();

const form = reactive({
  clienteId: '',
  empleadoId: '',
  servicioId: '',
  fecha: '',
  hora: '',
  duracionMinutos: 30,
});

onMounted(() => {
  citasStore.cargarCitas();
  clientesStore.cargarClientes();
});

async function onSubmit() {
  if (!form.fecha || !form.hora) return;
  const fechaHora = new Date(`${form.fecha}T${form.hora}`).toISOString();

  const ok = await citasStore.agendarCita({
    clienteId: form.clienteId,
    empleadoId: form.empleadoId || 'emp-general',
    servicioId: form.servicioId || 'srv-general',
    fechaHora,
    duracionMinutos: Number(form.duracionMinutos),
  });

  if (ok) {
    form.fecha = '';
    form.hora = '';
  }
}

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString('es-BO', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

async function accion(id: string, accion: 'confirmar' | 'completar' | 'cancelar') {
  await citasStore.cambiarEstado(id, accion);
}

const siguienteAccion: Record<string, { texto: string; accion: 'confirmar' | 'completar' | 'cancelar'; clase: string } | null> = {
  PENDIENTE: { texto: 'Confirmar', accion: 'confirmar', clase: 'bg-blue-600 hover:bg-blue-700' },
  CONFIRMADA: { texto: 'Completar', accion: 'completar', clase: 'bg-emerald-600 hover:bg-emerald-700' },
  COMPLETADA: null,
  CANCELADA: null,
};
</script>

<template>
  <div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
    <section class="h-fit rounded-xl border border-slate-200 bg-white p-5">
      <h2 class="font-display text-sm font-semibold text-slate-900">Agendar cita</h2>
      <p class="mt-1 text-xs text-slate-400">Valida automáticamente cruces de horario.</p>

      <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Cliente</label>
          <select
            v-model="form.clienteId"
            required
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            <option value="" disabled>Selecciona un cliente</option>
            <option v-for="c in clientesStore.clientes" :key="c.id" :value="c.id">
              {{ c.nombre }} {{ c.apellido }}
            </option>
          </select>
          <p v-if="clientesStore.clientes.length === 0" class="mt-1 text-[11px] text-amber-600">
            Registra un cliente primero en la sección Clientes.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-600">Fecha</label>
            <input
              v-model="form.fecha"
              required
              type="date"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-600">Hora</label>
            <input
              v-model="form.hora"
              required
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Duración (min)</label>
          <input
            v-model.number="form.duracionMinutos"
            type="number"
            min="15"
            step="15"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <p v-if="citasStore.error" class="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {{ citasStore.error }}
        </p>

        <button
          type="submit"
          :disabled="citasStore.guardando || !form.clienteId"
          class="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ citasStore.guardando ? 'Agendando…' : 'Agendar cita' }}
        </button>
      </form>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 class="font-display text-sm font-semibold text-slate-900">
          Citas ({{ citasStore.total }})
        </h2>
      </div>

      <div class="px-5 py-4">
        <EstadoCarga
          :cargando="citasStore.cargando"
          :error="citasStore.citas.length === 0 ? citasStore.error : null"
          :vacio="!citasStore.cargando && !citasStore.error && citasStore.citas.length === 0"
          mensaje-vacio="No hay citas agendadas todavía."
        >
          <ul class="divide-y divide-slate-100">
            <li
              v-for="cita in citasStore.ordenadasPorFecha"
              :key="cita.id"
              class="flex items-center justify-between gap-3 py-3"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-slate-800">{{ formatearFecha(cita.fechaHora) }}</p>
                <p class="text-xs text-slate-400">
                  Cliente {{ clientesStore.porId(cita.clienteId)?.nombre ?? cita.clienteId.slice(0, 8) }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <EstadoBadge :estado="cita.estado" />

                <button
                  v-if="siguienteAccion[cita.estado]"
                  class="rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors"
                  :class="siguienteAccion[cita.estado]!.clase"
                  @click="accion(cita.id, siguienteAccion[cita.estado]!.accion)"
                >
                  {{ siguienteAccion[cita.estado]!.texto }}
                </button>
                <button
                  v-if="cita.estado === 'PENDIENTE' || cita.estado === 'CONFIRMADA'"
                  class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
                  @click="accion(cita.id, 'cancelar')"
                >
                  Cancelar
                </button>
              </div>
            </li>
          </ul>
        </EstadoCarga>
      </div>
    </section>
  </div>
</template>
