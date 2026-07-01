import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clientes
export const clienteService = {
  async crear(datos: { nombre: string; apellido: string; email: string; telefono: string; tipo?: string }) {
    const response = await api.post('/clientes', datos);
    return response.data;
  },
  async listar() {
    const response = await api.get('/clientes');
    return response.data;
  },
  async obtenerPorId(id: string) {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
};

// Citas
export const citaService = {
  async agendar(datos: { clienteId: string; empleadoId: string; servicioId: string; fechaHora: string; duracionMinutos: number; notas?: string }) {
    const response = await api.post('/citas', datos);
    return response.data;
  },
  async listar(clienteId?: string) {
    const params = clienteId ? { clienteId } : {};
    const response = await api.get('/citas', { params });
    return response.data;
  },
  async cambiarEstado(id: string, accion: 'confirmar' | 'completar' | 'cancelar') {
    const response = await api.patch(`/citas/${id}/estado`, { accion });
    return response.data;
  },
};