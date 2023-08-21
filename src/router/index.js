import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/AboutView.vue')
  },
  {
    path: '/',
    name: 'bienvenida',
    component: () => import("../components/BienvenidaComponent")
  },
  {
    path: '/areas',
    name: 'areas',
    component: () => import("../components/areas/AreaView")
  },
  {
    path: '/tipos',
    name: 'tipos',
    component: () => import("../components/tipos/TipoView")
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: () => import("../components/empleados/EmpleadoView")
  },
  {
    path: '/add-empleados',
    name: 'Add empleado',
    component: () => import("../components/empleados/AddEmpleado")
  },
  {
    path: '/edit-empleados/:id',
    name: 'Edit empleados',
    component: () => import("../components/empleados/EditEmpleado")
  },
  {
    path: '/delete-empleados/:id',
    name: 'Delete empleados',
    component: () => import("../components/empleados/DeleteEmpleado")
  },
  {
    path: '/add-areas',
    name: 'Add area',
    component: () => import("../components/areas/AddArea")
  },
  {
    path: '/edit-areas/:id',
    name: 'Edit areas',
    component: () => import("../components/areas/EditArea")
  },
  {
    path: '/delete-areas/:id',
    name: 'Delete areas',
    component: () => import("../components/areas/DeleteArea")
  },
  {
    path: '/add-tipos',
    name: 'Add tipo',
    component: () => import("../components/tipos/AddTipo")
  },
  {
    path: '/edit-tipos/:id',
    name: 'Edit tipos',
    component: () => import("../components/tipos/EditTipo")
  },
  {
    path: '/delete-tipos/:id',
    name: 'Delete tipos',
    component: () => import("../components/tipos/DeleteTipo")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
