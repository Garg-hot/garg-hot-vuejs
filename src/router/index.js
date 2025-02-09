import { createRouter, createWebHistory } from 'vue-router';
import Categorie from '../components/templates/Categorie.vue';
import Plat from '../components/templates/Plat.vue';
import Ingredient from '../components/templates/Ingredient.vue';
import Prix from '../components/templates/Prix.vue';
import Commande from '../components/templates/Commande.vue';

const routes = [
  { 
    path: '/', 
    redirect: '/plat'
  },
  { 
    path: '/categorie', 
    name: 'categorie',
    component: Categorie 
  },
  { 
    path: '/plat', 
    name: 'plat',
    component: Plat 
  },
  { 
    path: '/ingredient', 
    name: 'ingredient',
    component: Ingredient 
  },
  { 
    path: '/prix', 
    name: 'prix',
    component: Prix 
  },
  { 
    path: '/commande', 
    name: 'commande',
    component: Commande 
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/plat'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
