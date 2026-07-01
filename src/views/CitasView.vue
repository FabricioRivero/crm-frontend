<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestión de Citas</h1>

    <!-- Formulario -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-bold mb-4">Nueva Cita</h2>
      <form @submit.prevent="agendarCita" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ID Cliente</label>
          <input v-model="form.clienteId" type="text" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ID Empleado</label>
          <input v-model="form.empleadoId" type="text" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ID Servicio</label>
          <input v-model="form.servicioId" type="text" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
          <input v-model="form.fechaHora" type="datetime-local" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
          <input v-model.number="form.duracionMinutos" type="number" min="15" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div class="md:col-span-2">
          <button
            type="submit"
            :disabled="store.cargando"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ store.cargando ? 'Agendando...' : 'Agendar Cita' }}
          </button>
        </div>
      </form>
      <div v-if="store.error" class="mt-3 text-red-600">{{ store.error }}</div>
      <div v-if="exito" class="mt-3 text-green-600">Cita agendada exitosamente</div>
    </div>

    <!-- Lista -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Lista de Citas</h2>
      <div v-if="store.cargando" class="text-gray-500">Cargando...</div>
      <div v-else-if="store.citas.length === 0" class="text-gray-500">No hay citas registradas</div>
      <div v-else class="space-y-3">
        <div
          v-for="cita in store.citas"
          :key="cita.id"
          class="border rounded-lg p-4"
          :class="{
            'border-yellow-400 bg-yellow-50': cita.estado === 'PENDIENTE',
            'border-green-400 bg-green-50': cita.estado === 'CONFIRMADA',
            'border-gray-400 bg-gray-50': cita.estado === 'COMPLETADA',
            'border-red-400 bg-red-50': cita.estado === 'CANCELADA',
          }"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold">Cita #{{ cita.id.slice(0, 8) }}</p>
              <p class="text-sm text-gray-600">Cliente: {{ cita.clienteId }} | Empleado: {{ cita.empleadoId }}</p>
              <p class="text-sm text-gray-600">{{ new Date(cita.fechaHora).toLocaleString() }}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-sm font-medium" :class="estadoClase(cita.estado)">
              {{ cita.estado }}
            </span>
          </div>
          <div v-if="cita.estado === 'PENDIENTE' || cita.estado === 'CONFIRMADA'" class="mt-3 flex gap-2">
            <button
              v-if="cita.estado === 'PENDIENTE'"
              @click="cambiarEstado(cita.id, 'confirmar')"
              class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Confirmar
            </button>
            <button
              v-if="cita.estado === 'CONFIRMADA'"
              @click="cambiarEstado(cita.id, 'completar')"
              class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Completar
            </button>
            <button
              @click="cambiarEstado(cita.id, 'cancelar')"
              class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCitasStore } from '@/stores/citas'

const store = useCitasStore()
const exito = ref(false)

const form = ref({
  clienteId: '',
  empleadoId: '',
  servicioId: '',
  fechaHora: '',
  duracionMinutos: 30,
})

onMounted(() => {
  store.cargarCitas()
})

async function agendarCita() {
  exito.value = false
  try {
    await store.agendarCita({
      ...form.value,
      fechaHora: new Date(form.value.fechaHora).toISOString(),
    })
    exito.value = true
    form.value = { clienteId: '', empleadoId: '', servicioId: '', fechaHora: '', duracionMinutos: 30 }
  } catch (e) {
    // Error ya está en store.error
  }
}

async function cambiarEstado(id: string, accion: 'confirmar' | 'completar' | 'cancelar') {
  try {
    await store.cambiarEstado(id, accion)
  } catch (e) {
    // Error ya está en store.error
  }
}

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