<script setup lang="ts">
import { computed } from 'vue';
import type { EstadoCitaDTO } from '../services/api';

const props = defineProps<{ estado: EstadoCitaDTO }>();

const estilos: Record<EstadoCitaDTO, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800 ring-amber-600/20',
  CONFIRMADA: 'bg-blue-100 text-blue-800 ring-blue-600/20',
  COMPLETADA: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
  CANCELADA: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

const etiqueta: Record<EstadoCitaDTO, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
};

const clase = computed(() => estilos[props.estado]);
const texto = computed(() => etiqueta[props.estado]);
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
    :class="clase"
  >
    {{ texto }}
  </span>
</template>
