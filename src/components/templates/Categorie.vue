<script setup lang="ts">
import { ref } from 'vue';

const categories = ref([
  { id: 1, nom: 'Entrées' },
  { id: 2, nom: 'Plats principaux' },
  { id: 3, nom: 'Desserts' },
  { id: 4, nom: 'Boissons' },
  { id: 5, nom: 'Spécialités' }
]);

const selectedCategorie = ref<{ id: number, nom: string } | null>(null);

function submitForm() {
  // Code pour gérer la soumission du formulaire
}

function editCategorie(id: number) {
  const categorie = categories.value.find(c => c.id === id);
  if (categorie) {
    selectedCategorie.value = { ...categorie };
  }
}

function saveEdit() {
  if (selectedCategorie.value) {
    const index = categories.value.findIndex(c => c.id === selectedCategorie.value?.id);
    if (index !== -1) {
      categories.value[index].nom = selectedCategorie.value.nom;
    }
    selectedCategorie.value = null;
  }
}

function cancelEdit() {
  selectedCategorie.value = null;
}

function deleteCategorie(id: number) {
  // Code pour supprimer une catégorie
}
</script>

<template>
  <div class="categorie-container">
    <!-- Formulaire d'ajout -->
    <div class="categorie-form">
      <h2>Nouvelle Catégorie</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" placeholder="Nom de la catégorie" class="form-input" />
        </div>
        <button type="submit" class="form-button">Valider</button>
      </form>
    </div>

    <!-- Liste des catégories -->
    <div class="categorie-list">
      <h2>Liste des Catégories</h2>
      <div class="list-container">
        <div v-for="categorie in categories" :key="categorie.id" class="list-item">
          <span class="item-name">{{ categorie.nom }}</span>
          <div class="item-actions">
            <button @click="editCategorie(categorie.id)" class="action-button edit">Éditer</button>
            <button @click="deleteCategorie(categorie.id)" class="action-button delete">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire d'édition -->
    <div v-if="selectedCategorie" class="categorie-form edit-form">
      <h2>Modifier Catégorie</h2>
      <form @submit.prevent="saveEdit">
        <div class="form-group">
          <input type="text" v-model="selectedCategorie.nom" class="form-input" />
        </div>
        <div class="form-actions">
          <button type="submit" class="form-button save">Enregistrer</button>
          <button type="button" @click="cancelEdit" class="form-button cancel">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.categorie-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 30px;
}

.categorie-form,
.categorie-list {
  background: white;
  padding: 20px;
  border: 2px solid #000;
  width: 48%;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #000;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  font-size: 16px;
  color: #000;
}

.form-button {
  width: 100%;
  padding: 12px;
  background: white;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
  color: #000;
}

.form-button:hover {
  background-color: #f0f0f0;
}

.form-button.save {
  color: #27ae60;
}

.form-button.cancel {
  color: #7f8c8d;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
}

.item-name {
  font-size: 16px;
  color: #000;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 5px 10px;
  border: 1px solid #000;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #f0f0f0;
}

.action-button.edit {
  color: #2c3e50;
}

.action-button.delete {
  color: #e74c3c;
}

.edit-form {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
