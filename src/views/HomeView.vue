<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard CRM</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow">
        <h3 class="text-lg font-semibold">Total Clientes</h3>
        <p class="text-4xl font-bold mt-2">{{ clientesStore.totalClientes }}</p>
      </div>
      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow">
        <h3 class="text-lg font-semibold">Citas Pendientes</h3>
        <p class="text-4xl font-bold mt-2">{{ citasStore.citasPendientes.length }}</p>
      </div>
      <div class="bg-green-500 text-white rounded-lg p-6 shadow">
        <h3 class="text-lg font-semibold">Citas Confirmadas</h3>
        <p class="text-4xl font-bold mt-2">{{ citasStore.citasConfirmadas.length }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Próximas Citas</h2>
      <div v-if="citasStore.cargando" class="text-gray-500">Cargando...</div>
      <div v-else-if="citasStore.citas.length === 0" class="text-gray-500">No hay citas registradas</div>
      <div v-else class="space-y-3">
        <div
          v-for="cita in citasStore.citas.slice(0, 5)"
          :key="cita.id"
          class="border rounded-lg p-4 flex justify-between items-center"
          :class="{
            'border-yellow-400 bg-yellow-50': cita.estado === 'PENDIENTE',
            'border-green-400 bg-green-50': cita.estado === 'CONFIRMADA',
            'border-gray-400 bg-gray-50': cita.estado === 'COMPLETADA',
            'border-red-400 bg-red-50': cita.estado === 'CANCELADA',
          }"
        >
          <div>
            <p class="font-semibold">Cliente: {{ cita.clienteId }}</p>
            <p class="text-sm text-gray-600">{{ new Date(cita.fechaHora).toLocaleString() }}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-sm font-medium" :class="estadoClase(cita.estado)">
            {{ cita.estado }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useClientesStore } from '@/stores/clientes'
import { useCitasStore } from '@/stores/citas'

const clientesStore = useClientesStore()
const citasStore = useCitasStore()

onMounted(() => {
  clientesStore.cargarClientes()
  citasStore.cargarCitas()
})

function estadoClase(estado: string) {
  const clases: Record<string, string> = {
    PENDIENTE: 'bg-yellow-200 text-yellow-800',
    CONFIRMADA: 'bg-green-200 text-green-800',
    COMPLETADA: 'bg-gray-200 text-gray-800',
    CANCELADA: 'bg-red-200 text-red-800',
  }
  return clases[estado] || 'bg-gray-200'
}
</script>