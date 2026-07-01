import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/clientes', name: 'clientes', component: () => import('../views/ClientesView.vue') },
    { path: '/citas', name: 'citas', component: () => import('../views/CitasView.vue') },
  ],
});

export default router;
