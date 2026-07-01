# CRM Frontend - Vue 3 + TypeScript + Pinia

Frontend del sistema CRM de Citas para Negocios, desarrollado con **Vue 3**, **TypeScript**, **Vite**, **Pinia** y **TailwindCSS**.

## Integrantes del Grupo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Luis Fabricio Rivero Aban | Frontend & POO | @FabricioRivero |
| Santiago Antonio Encinas Jadue | Modelos & Lógica | @SantiagoEncinas |
| Santiago Zamora Barrios | Servicios & UI | @SantiagoZamora |

## Tecnologías

- **Framework:** Vue 3 (Composition API)
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Gestión de Estado:** Pinia
- **Routing:** Vue Router
- **UI Framework:** TailwindCSS
- **HTTP Client:** Axios

## Estructura del Proyecto
crm-frontend/
├── .gitignore
├── .vscode/
│   └── extensions.json
├── env.d.ts
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.cjs                      # Config PostCSS (Tailwind)
├── tailwind.config.cjs                     # Config TailwindCSS
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── favicon.ico
└── src/
    ├── main.ts                             # Punto de entrada Vue
    ├── App.vue                             # Layout principal (nav + RouterView)
    ├── assets/
    │   └── main.css                        # Directivas Tailwind (@tailwind)
    ├── components/                         # (vacío, componentes inline en views)
    ├── router/
    │   └── index.ts                        # Rutas: /, /clientes, /citas
    ├── services/
    │   └── api.ts                          # Axios: clientes y citas API
    ├── stores/
    │   ├── clientes.ts                     # Store Pinia - Clientes
    │   ├── citas.ts                        # Store Pinia - Citas
    │   └── counter.ts                      # (generado por create-vue, no usado)
    └── views/
        ├── HomeView.vue                    # Dashboard con estadísticas
        ├── ClientesView.vue                # Formulario + lista de clientes
        └── CitasView.vue                   # Formulario + lista de citas


## Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| **Dashboard** | Estadísticas en tiempo real (total clientes, citas pendientes/confirmadas) |
| **Clientes** | Crear y listar clientes con validación de email único |
| **Citas** | Agendar citas, confirmar, completar, cancelar con validación de solapamiento |

## Instalación y Ejecución

```bash
# Clonar
git clone https://github.com/FabricioRivero/crm-frontend.git
cd crm-frontend

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

El frontend corre en http://localhost:5173

Nota: El backend debe estar corriendo en http://localhost:3000 para que el frontend funcione correctamente.

Conexión con Backend
El frontend consume la API REST del backend mediante Axios:

// Base URL configurada en src/services/api.ts
const API_URL = 'http://localhost:3000/api';

Build para producción
npm run build
Genera la carpeta dist/ lista para desplegar.