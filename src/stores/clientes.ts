import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { clienteService } from '@/services/api';

export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo: string;
  activo: boolean;
  historialCitas: string[];
}

export const useClientesStore = defineStore('clientes', () => {
  const clientes = ref<Cliente[]>([]);
  const cargando = ref(false);
  const error = ref<string | null>(null);

  const totalClientes = computed(() => clientes.value.length);

  async function cargarClientes() {
    cargando.value = true;
    error.value = null;
    try {
      clientes.value = await clienteService.listar();
    } catch (e: any) {
      console.error('Error cargando clientes:', e);
      error.value = e.response?.data?.error || e.message || 'Error al cargar clientes';
    } finally {
      cargando.value = false;
    }
  }

  async function crearCliente(datos: { nombre: string; apellido: string; email: string; telefono: string }) {
    cargando.value = true;
    error.value = null;
    try {
      const nuevo = await clienteService.crear(datos);
      clientes.value.push(nuevo);
      return nuevo;
    } catch (e: any) {
      console.error('Error creando cliente:', e);
      error.value = e.response?.data?.error || e.message || 'Error al crear cliente';
      throw error.value;
    } finally {
      cargando.value = false;
    }
  }

  return {
    clientes,
    cargando,
    error,
    totalClientes,
    cargarClientes,
    crearCliente,
  };
});