import { defineStore } from 'pinia';
import { api, extraerMensajeError, type ClienteDTO, type NuevoClienteDTO } from '../services/api';

interface ClientesState {
  clientes: ClienteDTO[];
  cargando: boolean;
  guardando: boolean;
  error: string | null;
}

export const useClientesStore = defineStore('clientes', {
  state: (): ClientesState => ({
    clientes: [],
    cargando: false,
    guardando: false,
    error: null,
  }),

  getters: {
    total: (state) => state.clientes.length,
    clientesVip: (state) => state.clientes.filter((c) => c.tipo === 'VIP').length,
    porId: (state) => (id: string) => state.clientes.find((c) => c.id === id),
  },

  actions: {
    async cargarClientes() {
      this.cargando = true;
      this.error = null;
      try {
        const { data } = await api.get<ClienteDTO[]>('/clientes');
        this.clientes = data;
      } catch (err) {
        this.error = extraerMensajeError(err);
      } finally {
        this.cargando = false;
      }
    },

    async registrarCliente(dto: NuevoClienteDTO): Promise<boolean> {
      this.guardando = true;
      this.error = null;
      try {
        const { data } = await api.post<ClienteDTO>('/clientes', dto);
        this.clientes.unshift(data);
        return true;
      } catch (err) {
        this.error = extraerMensajeError(err);
        return false;
      } finally {
        this.guardando = false;
      }
    },
  },
});
