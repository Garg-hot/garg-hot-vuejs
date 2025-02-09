<script setup lang="ts">
const menuItems = [
  { name: 'Ingredient', path: '/dashboard/ingredients' },
  { name: 'Categorie', path: '/dashboard/categories' },
  { name: 'Prix', path: '/dashboard/prix' },
  { name: 'Plat', path: '/dashboard/plats' },
  { name: 'Stock', path: '/dashboard/stocks' },
  { name: 'Vente', path: '/dashboard/ventes' },
  { name: 'Commande', path: '/dashboard/commandes' }
]
</script>

<template>
  <div class="menu-buttons">
    <router-link 
      v-for="item in menuItems" 
      :key="item.path"
      :to="item.path"
      class="menu-button"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<style scoped>
.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 300px;
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}

.menu-button {
  padding: 12px 20px;
  width: 200px;
  border: 2px solid #000;
  background-color: white;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: background-color 0.3s;
}

.menu-button:hover {
  background-color: #f0f0f0;
}
</style>
