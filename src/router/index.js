import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/templates/Home.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import Categorie from '../components/templates/Categorie.vue'
import Plat from '../components/templates/Plat.vue'
import Ingredient from '../components/templates/Ingredient.vue'
import Commande from '../components/templates/Commande.vue'
import Login from '../components/templates/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'categories',
          name: 'categories',
          component: Categorie
        },
        {
          path: 'plats',
          name: 'plats',
          component: Plat
        },
        {
          path: 'ingredients',
          name: 'ingredients',
          component: Ingredient
        },
        {
          path: 'commandes',
          name: 'commandes',
          component: Commande
        }
      ]
    }
  ]
})

export default router // ✅ Utilise `export default` au lieu de `module.exports`
