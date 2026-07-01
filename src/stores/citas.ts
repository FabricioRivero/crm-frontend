import { defineStore } from 'pinia';
import { api, extraerMensajeError, type CitaDTO, type NuevaCitaDTO } from '../services/api';

interface CitasState {
  citas: CitaDTO[];
  cargando: boolean;
  guardando: boolean;
  error: string | null;
}

export const useCitasStore = defineStore('citas', {
  state: (): CitasState => ({
    citas: [],
    cargando: false,
    guardando: false,
    error: null,
  }),

  getters: {
    total: (state) => state.citas.length,
    pendientes: (state) => state.citas.filter((c) => c.estado === 'PENDIENTE').length,
    confirmadas: (state) => state.citas.filter((c) => c.estado === 'CONFIRMADA').length,
    ordenadasPorFecha: (state) =>
      [...state.citas].sort(
        (a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime(),
      ),
  },

  actions: {
    async cargarCitas() {
      this.cargando = true;
      this.error = null;
      try {
        const { data } = await api.get<CitaDTO[]>('/citas');
        this.citas = data;
      } catch (err) {
        this.error = extraerMensajeError(err);
      } finally {
        this.cargando = false;
      }
    },

    async agendarCita(dto: NuevaCitaDTO): Promise<boolean> {
      this.guardando = true;
      this.error = null;
      try {
        const { data } = await api.post<CitaDTO>('/citas', dto);
        this.citas.unshift(data);
        return true;
      } catch (err) {
        this.error = extraerMensajeError(err);
        return false;
      } finally {
        this.guardando = false;
      }
    },

    async cambiarEstado(id: string, accion: 'confirmar' | 'completar' | 'cancelar') {
      this.error = null;
      try {
        const { data } = await api.patch<CitaDTO>(`/citas/${id}/estado`, { accion });
        const index = this.citas.findIndex((c) => c.id === id);
        if (index !== -1) this.citas[index] = data;
        return true;
      } catch (err) {
        this.error = extraerMensajeError(err);
        return false;
      }
    },
  },
});
