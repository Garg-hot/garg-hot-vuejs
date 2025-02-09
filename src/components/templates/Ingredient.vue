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
  <div>
    <h1>Ingrédients</h1>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Formulaire d'ajout -->
    <div class="add-form">
      <input v-model="newIngredient.nom" placeholder="Nom de l'ingrédient" required />
      <button @click="addIngredient">Ajouter</button>
    </div>

    <!-- Liste des ingrédients -->
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.id">
        {{ ingredient.nom }}
        <button @click="editIngredient = { ...ingredient }">Éditer</button>
        <button @click="deleteIngredient(ingredient)">Supprimer</button>
      </li>
    </ul>

    <!-- Formulaire d'édition -->
    <div v-if="editIngredient" class="edit-form">
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
</template>

