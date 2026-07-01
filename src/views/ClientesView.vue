<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestión de Clientes</h1>

    <!-- Formulario -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-bold mb-4">Nuevo Cliente</h2>
      <form @submit.prevent="crearCliente" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="form.nombre" type="text" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input v-model="form.apellido" type="text" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input v-model="form.telefono" type="tel" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="md:col-span-2">
          <button
            type="submit"
            :disabled="store.cargando"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ store.cargando ? 'Guardando...' : 'Crear Cliente' }}
          </button>
        </div>
      </form>
      <div v-if="store.error" class="mt-3 text-red-600">{{ store.error }}</div>
      <div v-if="exito" class="mt-3 text-green-600">Cliente creado exitosamente</div>
    </div>

    <!-- Lista -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Lista de Clientes</h2>
      <div v-if="store.cargando" class="text-gray-500">Cargando...</div>
      <div v-else-if="store.clientes.length === 0" class="text-gray-500">No hay clientes registrados</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2">Nombre</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Teléfono</th>
              <th class="px-4 py-2">Tipo</th>
              <th class="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in store.clientes" :key="cliente.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ cliente.nombre }} {{ cliente.apellido }}</td>
              <td class="px-4 py-2">{{ cliente.email }}</td>
              <td class="px-4 py-2">{{ cliente.telefono }}</td>
              <td class="px-4 py-2">
                <span class="px-2 py-1 rounded text-sm" :class="tipoClase(cliente.tipo)">
                  {{ cliente.tipo }}
                </span>
              </td>
              <td class="px-4 py-2">
                <span class="px-2 py-1 rounded text-sm" :class="cliente.activo ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'">
                  {{ cliente.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientesStore } from '@/stores/clientes'

const store = useClientesStore()
const exito = ref(false)

const form = ref({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
})

onMounted(() => {
  store.cargarClientes()
})

async function crearCliente() {
  exito.value = false
  try {
    await store.crearCliente(form.value)
    exito.value = true
    form.value = { nombre: '', apellido: '', email: '', telefono: '' }
  } catch (e) {
    // Error ya está en store.error
  }
}

function tipoClase(tipo: string) {
  const clases: Record<string, string> = {
    NUEVO: 'bg-blue-200 text-blue-800',
    REGULAR: 'bg-gray-200 text-gray-800',
    VIP: 'bg-purple-200 text-purple-800',
  }
  return clases[tipo] || 'bg-gray-200'
}
</script>