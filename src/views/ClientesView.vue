<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useClientesStore } from '../stores/clientes';
import EstadoCarga from '../components/EstadoCarga.vue';

const store = useClientesStore();

const form = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
});

const exito = reactive({ visible: false });

onMounted(() => store.cargarClientes());

async function onSubmit() {
  const ok = await store.registrarCliente({ ...form });
  if (ok) {
    form.nombre = '';
    form.apellido = '';
    form.email = '';
    form.telefono = '';
    exito.visible = true;
    setTimeout(() => (exito.visible = false), 2500);
  }
}

function iniciales(nombre: string, apellido: string) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}
</script>

<template>
  <div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
    <section class="h-fit rounded-xl border border-slate-200 bg-white p-5">
      <h2 class="font-display text-sm font-semibold text-slate-900">Registrar cliente</h2>
      <p class="mt-1 text-xs text-slate-400">El email debe ser único en el sistema.</p>

      <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Nombre</label>
          <input
            v-model="form.nombre"
            required
            type="text"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Apellido</label>
          <input
            v-model="form.apellido"
            required
            type="text"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Email</label>
          <input
            v-model="form.email"
            required
            type="email"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Teléfono</label>
          <input
            v-model="form.telefono"
            required
            type="tel"
            placeholder="70012345"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <p v-if="store.error" class="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {{ store.error }}
        </p>
        <p v-if="exito.visible" class="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          Cliente registrado correctamente
        </p>

        <button
          type="submit"
          :disabled="store.guardando"
          class="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ store.guardando ? 'Guardando…' : 'Registrar cliente' }}
        </button>
      </form>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 class="font-display text-sm font-semibold text-slate-900">
          Clientes ({{ store.total }})
        </h2>
      </div>

      <div class="px-5 py-4">
        <EstadoCarga
          :cargando="store.cargando"
          :error="store.clientes.length === 0 ? store.error : null"
          :vacio="!store.cargando && !store.error && store.clientes.length === 0"
          mensaje-vacio="Todavía no registraste ningún cliente."
        >
          <ul class="divide-y divide-slate-100">
            <li
              v-for="cliente in store.clientes"
              :key="cliente.id"
              class="flex items-center gap-3 py-3"
            >
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700"
              >
                {{ iniciales(cliente.nombre, cliente.apellido) }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-slate-800">
                  {{ cliente.nombre }} {{ cliente.apellido }}
                </p>
                <p class="truncate text-xs text-slate-400">{{ cliente.email }} · {{ cliente.telefono }}</p>
              </div>
              <span
                v-if="cliente.tipo === 'VIP'"
                class="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700"
              >
                VIP
              </span>
            </li>
          </ul>
        </EstadoCarga>
      </div>
    </section>
  </div>
</template>
