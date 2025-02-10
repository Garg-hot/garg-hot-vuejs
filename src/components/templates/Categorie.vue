<script setup>
import { ref, onMounted } from "vue";
import categorieService from "../../services/CategorieService";

const categories = ref([]);
const newCategorie = ref({ nom: "" });
const editCategorie = ref(null);
const errorMessage = ref("");

// Charger toutes les catégories au montage du composant
const fetchCategories = async () => {
  console.log("Début fetchCategories...");
  try {
    const response = await categorieService.getAllCategories();
    console.log("Réponse brute de l'API:", response);
    categories.value = response;
    console.log("Categories après assignation:", categories.value);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    errorMessage.value = "Erreur lors du chargement des catégories.";
    console.error(error);
  }
};

// Ajouter une catégorie
const addCategorie = async () => {
  console.log("Tentative d'ajout de catégorie:", newCategorie.value);
  if (!newCategorie.value.nom) return;
  try {
    const response = await categorieService.createCategorie(newCategorie.value);
    console.log("Réponse de création:", response);
    categories.value.push(response.categorie);
    newCategorie.value.nom = "";
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    errorMessage.value = "Erreur lors de l'ajout de la catégorie.";
    console.error(error);
  }
};

// Mettre à jour une catégorie
const updateCategorie = async () => {
  if (!editCategorie.value) return;
  try {
    await categorieService.updateCategorie(editCategorie.value.id, editCategorie.value);
    categories.value = categories.value.map(cat =>
      cat.id === editCategorie.value.id ? { ...editCategorie.value } : cat
    );
    editCategorie.value = null;
  } catch (error) {
    errorMessage.value = "Erreur lors de la mise à jour de la catégorie.";
    console.error(error);
  }
};

// Supprimer une catégorie
const deleteCategorie = async (categorie) => {
  try {
    await categorieService.deleteCategorie(categorie.id);
    categories.value = categories.value.filter(cat => cat.id !== categorie.id);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression de la catégorie.";
    console.error(error);
  }
};

onMounted(() => {
  console.log("Composant Categorie monté");
  fetchCategories();
});
</script>

<template>
  <div class="categorie-container">
    <div class="categorie-form">
      <h1>Catégories</h1>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Formulaire d'ajout -->
      <div class="add-form">
        <input v-model="newCategorie.nom" placeholder="Nom de la catégorie" required />
        <button @click="addCategorie">Ajouter</button>
      </div>

      <!-- Liste des catégories -->
      <ul>
        <li v-for="categorie in categories" :key="categorie.id">
          {{ categorie.nom }}
          <button @click="editCategorie = { ...categorie }"class="action-button edit">Éditer</button>
          <button @click="deleteCategorie(categorie)"class="action-button delete">Supprimer</button>
        </li>
      </ul>

      <!-- Formulaire d'édition -->
      <div v-if="editCategorie" class="edit-form">
        <h2>Édition de la catégorie</h2>
        <div>
          <label for="nom">Nom</label>
          <input id="nom" v-model="editCategorie.nom" placeholder="Nom" required />
        </div>
        <div>
          <label for="slug">Slug</label>
          <input id="slug" v-model="editCategorie.slug" placeholder="Slug" required />
        </div>
        <div class="edit-actions">
          <button @click="updateCategorie">Mettre à jour</button>
          <button @click="editCategorie = null">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categorie-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  color: #000;
}

.categorie-form {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 300px;
}

.categorie-list {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 500px;
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
  transition: background-color 0.3s;
  margin-bottom: 10px;
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

.item-info {
  display: flex;
  gap: 15px;
  align-items: center;
}

.item-name {
  font-size: 16px;
  color: #000;
}

.item-quantity {
  font-size: 14px;
  color: #666;
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
</style>
