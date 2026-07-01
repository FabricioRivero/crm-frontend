import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { citaService } from '@/services/api';

export interface Cita {
  id: string;
  clienteId: string;
  empleadoId: string;
  servicioId: string;
  fechaHora: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';
  notas: string;
}

export const useCitasStore = defineStore('citas', () => {
  const citas = ref<Cita[]>([]);
  const cargando = ref(false);
  const error = ref<string | null>(null);

  const citasPendientes = computed(() => citas.value.filter(c => c.estado === 'PENDIENTE'));
  const citasConfirmadas = computed(() => citas.value.filter(c => c.estado === 'CONFIRMADA'));
  const citasCompletadas = computed(() => citas.value.filter(c => c.estado === 'COMPLETADA'));

  async function cargarCitas(clienteId?: string) {
    cargando.value = true;
    error.value = null;
    try {
      citas.value = await citaService.listar(clienteId);
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al cargar citas';
    } finally {
      cargando.value = false;
    }
  }

  async function agendarCita(datos: { clienteId: string; empleadoId: string; servicioId: string; fechaHora: string; duracionMinutos: number }) {
    cargando.value = true;
    error.value = null;
    try {
      const nueva = await citaService.agendar(datos);
      citas.value.push(nueva);
      return nueva;
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al agendar cita';
      throw error.value;
    } finally {
      cargando.value = false;
    }
  }

  async function cambiarEstado(id: string, accion: 'confirmar' | 'completar' | 'cancelar') {
    try {
      const actualizada = await citaService.cambiarEstado(id, accion);
      const index = citas.value.findIndex(c => c.id === id);
      if (index !== -1) {
        citas.value[index] = actualizada;
      }
      return actualizada;
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Error al cambiar estado';
      throw error.value;
    }
  }

  return {
    citas,
    cargando,
    error,
    citasPendientes,
    citasConfirmadas,
    citasCompletadas,
    cargarCitas,
    agendarCita,
    cambiarEstado,
  };
});