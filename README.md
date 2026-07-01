# CRM Frontend - Vue 3 + TypeScript + Pinia

Frontend del sistema CRM de Citas para Negocios, desarrollado con **Vue 3** (Composition API), **TypeScript**, **Vite**, **Pinia** y **TailwindCSS**. Consume la API REST del repositorio [`crm-backend`](https://github.com/FabricioRivero/crm-backend).

## Integrantes del Grupo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Luis Fabricio Rivero Aban | Frontend & POO | @FabricioRivero |
| Santiago Antonio Encinas Jadue | Modelos & Lógica | @SantiagoEncinas |
| Santiago Zamora Barrios | Servicios & UI | @SantiagoZamora |

## Tecnologías

- **Framework:** Vue 3 (`<script setup>`, Composition API)
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Gestión de Estado:** Pinia
- **Routing:** Vue Router 4
- **UI:** TailwindCSS
- **HTTP Client:** Axios

## Estructura del Proyecto

```
src/
├── assets/
│   └── main.css              # Directivas Tailwind + tipografía
├── components/
│   ├── EstadoBadge.vue       # Badge de estado de cita (reutilizable)
│   └── EstadoCarga.vue       # Maneja carga / error / vacío (reutilizable)
├── router/
│   └── index.ts
├── services/
│   └── api.ts                # Cliente Axios + tipos DTO + manejo de errores
├── stores/
│   ├── clientes.ts           # Pinia: estado carga/guardando/error
│   └── citas.ts              # Pinia: estado carga/guardando/error
├── views/
│   ├── HomeView.vue          # Dashboard con estadísticas en vivo
│   ├── ClientesView.vue      # Registro + listado de clientes
│   └── CitasView.vue         # Agendar + listar + confirmar/completar/cancelar
├── App.vue                   # Layout con navegación lateral (responsive)
└── main.ts
```

## Manejo de estados (carga / éxito / error)

Cada store expone `cargando`, `guardando` y `error` de forma explícita. Las vistas usan el componente `EstadoCarga` para mostrar:

- **Cargando** — spinner mientras se pide la data al backend
- **Error** — mensaje legible extraído del `DomainError` del backend (ej. "Ya existe un cliente registrado con el email...")
- **Vacío** — mensaje cuando no hay datos todavía
- **Éxito** — confirmación visual al registrar un cliente o agendar una cita

## Instalación y Ejecución

```bash
git clone https://github.com/FabricioRivero/crm-frontend.git
cd crm-frontend
npm install

cp .env.example .env   # ajustar VITE_API_URL si el backend no corre en localhost:3000

npm run dev
```

El frontend corre en `http://localhost:5173`.

> **Importante:** el backend (`crm-backend`) debe estar corriendo en `http://localhost:3000` para que las vistas carguen datos.

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` (verificado: compila sin errores con `vue-tsc -b && vite build`).

## Conexión con el Backend

```ts
// src/services/api.ts
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
export const api = axios.create({ baseURL: API_URL, ... });
```

Los tipos `ClienteDTO` y `CitaDTO` reflejan exactamente el `toPrimitives()` de las entidades del backend, para mantener el contrato del API sincronizado entre ambos repositorios.
