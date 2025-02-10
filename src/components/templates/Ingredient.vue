<script setup>
import { ref, onMounted } from "vue";
import ingredientService from "../../services/IngredientService";

const ingredients = ref([]);
const newIngredient = ref({ nom: "" });
const editIngredient = ref(null);
const errorMessage = ref("");

// Charger tous les ingrédients au montage du composant
const fetchIngredients = async () => {
  console.log("Début fetchIngredients...");
  try {
    const response = await ingredientService.getAllIngredients();
    console.log("Réponse brute de l'API:", response);
    ingredients.value = response;
    console.log("Ingrédients après assignation:", ingredients.value);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    errorMessage.value = "Erreur lors du chargement des ingrédients.";
    console.error(error);
  }
};

// Ajouter un ingrédient
const addIngredient = async () => {
  console.log("Tentative d'ajout d'ingrédient:", newIngredient.value);
  if (!newIngredient.value.nom) return;
  try {
    const response = await ingredientService.createIngredient(newIngredient.value);
    console.log("Réponse de création:", response);
    ingredients.value.push(response.ingredient);
    newIngredient.value.nom = "";
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    errorMessage.value = "Erreur lors de l'ajout de l'ingrédient.";
    console.error(error);
  }
};

// Mettre à jour un ingrédient
const updateIngredient = async () => {
  if (!editIngredient.value) return;
  try {
    await ingredientService.updateIngredient(editIngredient.value.id, editIngredient.value);
    ingredients.value = ingredients.value.map(ing =>
      ing.id === editIngredient.value.id ? { ...editIngredient.value } : ing
    );
    editIngredient.value = null;
  } catch (error) {
    errorMessage.value = "Erreur lors de la mise à jour de l'ingrédient.";
    console.error(error);
  }
};

// Supprimer un ingrédient
const deleteIngredient = async (ingredient) => {
  try {
    await ingredientService.deleteIngredient(ingredient.id);
    ingredients.value = ingredients.value.filter(ing => ing.id !== ingredient.id);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression de l'ingrédient.";
    console.error(error);
  }
};

onMounted(() => {
  console.log("Composant Ingredient monté");
  fetchIngredients();
});
</script>

<template>
  <div class="categorie-container">
    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="form-container">
      <!-- Formulaire d'ajout et formulaire d'édition alignés horizontalement -->
      <div class="form-wrapper">
        <div class="categorie-form">
          <h2>Ajouter un Ingrédient</h2>
          <div class="add-form">
            <input v-model="newIngredient.nom" placeholder="Nom de l'ingrédient" required />
            <button @click="addIngredient">Ajouter</button>
          </div>
        </div>

        <div v-if="editIngredient" class="categorie-form edit-form">
          <h2>Édition de l'ingrédient</h2>
          <div>
            <label for="nom">Nom</label>
            <input id="nom" v-model="editIngredient.nom" placeholder="Nom" required />
          </div>
          <div class="edit-actions">
            <button @click="updateIngredient">Mettre à jour</button>
            <button @click="editIngredient = null">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des ingrédients -->
    <div class="categorie-list">
      <h2>Liste des Ingrédients</h2>
      <ul>
        <li v-for="ingredient in ingredients" :key="ingredient.id">
          {{ ingredient.nom }}
          <button @click="editIngredient = { ...ingredient }" class="action-button edit">Éditer</button>
          <button @click="deleteIngredient(ingredient)" class="action-button delete">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.categorie-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000;
  gap: 30px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.form-wrapper {
  display: flex;
  gap: 20px; /* Espacement horizontal */
  justify-content: space-between;
  width: 100%;
}

.categorie-form {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 45%; /* Largeur réduite pour l'alignement horizontal */
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

.add-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  font-size: 16px;
}

.add-form button {
  width: 100%;
  padding: 12px;
  background: white;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 10px;
  color: #000;
}

.add-form button:hover {
  background-color: #f0f0f0;
}

.edit-actions button {
  width: 48%;
  padding: 12px;
  background: white;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.edit-actions button:hover {
  background-color: #f0f0f0;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
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

.error-message {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
