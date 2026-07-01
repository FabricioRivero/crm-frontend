import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Tipos espejo de los `toPrimitives()` del backend (contrato del API)
export interface ClienteDTO {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo: 'REGULAR' | 'VIP' | 'NUEVO';
  activo: boolean;
  historialCitas: string[];
}

export interface NuevoClienteDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo?: 'REGULAR' | 'VIP' | 'NUEVO';
}

export type EstadoCitaDTO = 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';

export interface CitaDTO {
  id: string;
  clienteId: string;
  empleadoId: string;
  servicioId: string;
  fechaHora: string;
  estado: EstadoCitaDTO;
  notas: string;
}

export interface NuevaCitaDTO {
  clienteId: string;
  empleadoId: string;
  servicioId: string;
  fechaHora: string;
  duracionMinutos: number;
}

/** Extrae un mensaje de error legible desde una respuesta de Axios/DomainError del backend */
export function extraerMensajeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const mensaje = error.response?.data?.error;
    if (mensaje) return mensaje;
    if (error.code === 'ERR_NETWORK') {
      return 'No se pudo conectar con el servidor. ¿Está corriendo el backend en ' + API_URL + '?';
    }
  }
  return 'Ocurrió un error inesperado';
}
