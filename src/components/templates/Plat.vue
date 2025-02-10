<script setup>
import { ref, onMounted } from "vue";
import platService from "../../services/PlatService";
import categorieService from "../../services/CategorieService";
import ingredientService from "../../services/IngredientService";

const plats = ref([]);
const categories = ref([]);
const ingredients = ref([]);
const newPlat = ref({ nom: "", description: "", duration: null, categorie: "", ingredients: [] });
const editPlat = ref(null);
const errorMessage = ref("");

// Charger les plats et les catégories au montage
const fetchPlats = async () => {
  console.log("Fetching plats...");
  try {
    const response = await platService.getAllPlats();
    plats.value = response;
    console.log("Plats chargés:", plats.value);
  } catch (error) {
    console.error("Erreur lors du chargement des plats:", error);
    errorMessage.value = "Erreur lors du chargement des plats.";
  }
};

const fetchCategories = async () => {
  console.log("Fetching categories...");
  try {
    categories.value = await categorieService.getAllCategories();
    console.log("Catégories chargées:", categories.value);
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
    errorMessage.value = "Erreur lors du chargement des catégories.";
  }
};

const fetchIngredients = async () => {
  console.log("Fetching ingredients...");
  try {
    ingredients.value = await ingredientService.getAllIngredients();
    console.log("Ingrédients chargés:", ingredients.value);
  } catch (error) {
    console.error("Erreur lors du chargement des ingrédients:", error);
    errorMessage.value = "Erreur lors du chargement des ingrédients.";
  }
};

const addPlat = async () => {
  console.log("Tentative d'ajout du plat:", newPlat.value);
  if (!newPlat.value.nom || !newPlat.value.categorie) {
    console.warn("Nom et catégorie sont requis");
    return;
  }
  console.log(newPlat);
  try {
    const selectedCategory = categories.value.find(cat => cat.id === newPlat.value.categorie);
    if (!selectedCategory) {
      console.error("Catégorie non trouvée");
      return;
    }

    // Construire l'objet avec la catégorie et les ingrédients
    const platToSend = {
      nom: newPlat.value.nom,
      description: newPlat.value.description,
      duration: newPlat.value.duration,
      categorie: {
        nom: selectedCategory.nom
      },
      ingredients: newPlat.value.ingredients.map(id => ({ id }))
    };

    const plat = await platService.createPlat(platToSend);
    console.log("Plat ajouté avec succès:", plat);
    plats.value.push(plat);
    newPlat.value = { nom: "", description: "", duration: null, categorie: "", ingredients: [] };
  } catch (error) {
    console.error("Erreur lors de l'ajout du plat:", error);
    errorMessage.value = "Erreur lors de l'ajout du plat.";
  }
};

// Mettre à jour un plat
const updatePlat = async () => {
  console.log("Tentative de mise à jour du plat:", editPlat.value);
  if (!editPlat.value) {
    console.warn("Aucun plat sélectionné pour mise à jour");
    return;
  }
  try {
    // Trouver la catégorie sélectionnée pour obtenir son nom
    const selectedCategory = categories.value.find(cat => cat.id === editPlat.value.categorie);
    if (!selectedCategory) {
      console.error("Catégorie non trouvée");
      return;
    }

    // Construire l'objet avec le format attendu par l'API
    const platToUpdate = {
      nom: editPlat.value.nom,
      description: editPlat.value.description,
      duration: editPlat.value.duration,
      categorie: {
        id: selectedCategory.id,
        nom: selectedCategory.nom,
        slug: selectedCategory.slug
      },
      ingredients: editPlat.value.ingredients
    };

    console.log("Données envoyées à l'API:", platToUpdate);
    const response = await platService.updatePlat(editPlat.value.id, platToUpdate);
    console.log("Réponse de l'API après mise à jour:", response);
    
    // Mettre à jour la liste locale
    const updatedPlat = await platService.getPlatById(editPlat.value.id);
    plats.value = plats.value.map(p => (p.id === editPlat.value.id ? updatedPlat : p));
    console.log("Plat mis à jour avec succès:", updatedPlat);
    editPlat.value = null;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du plat:", error);
    errorMessage.value = "Erreur lors de la mise à jour du plat.";
  }
};

// Supprimer un plat
const deletePlat = async (plat) => {
  console.log("Tentative de suppression du plat:", plat);
  try {
    await platService.deletePlat(plat.id);
    plats.value = plats.value.filter(p => p.id !== plat.id);
    console.log("Plat supprimé avec succès:", plat);
  } catch (error) {
    console.error("Erreur lors de la suppression du plat:", error);
    errorMessage.value = "Erreur lors de la suppression du plat.";
  }
};

onMounted(() => {
  console.log("Montage du composant...");
  fetchPlats();
  fetchCategories();
  fetchIngredients();
});
</script>

<template>
  <div class="container">
    <h1>Plats</h1>

    <div class="add-form">
      <input v-model="newPlat.nom" class="input-field" placeholder="Nom du plat" />
      <br>
      <textarea v-model="newPlat.description" class="textarea-field" placeholder="Description"></textarea>
      <br>
      <input v-model="newPlat.duration" type="number" class="input-field" placeholder="Durée (min)" />
      <br>
      <select v-model="newPlat.categorie" class="select-field" required>
        <option value="" disabled selected>-- Sélectionnez une catégorie --</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.nom }}
        </option>
      </select>
      <br>
      <div class="ingredients-section">
        <h3 class="section-title">Ingrédients</h3>
        <div class="ingredients-grid">
          <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-item">
            <input
              type="checkbox"
              :id="'new-ingredient-' + ingredient.id"
              :value="ingredient.id"
              v-model="newPlat.ingredients"
            >
            <label :for="'new-ingredient-' + ingredient.id">{{ ingredient.nom }}</label>
          </div>
        </div>
      </div>
      <br>
      <button @click="addPlat" class="btn-primary">Ajouter</button>
    </div>

    <ul class="plat-list">
      <li v-for="plat in plats" :key="plat.id" class="list-item">
        <strong>{{ plat.nom }}</strong> - {{ plat.description }} - Durée ({{ plat.duration }} min) - {{ plat.categorie?.nom }}
        <div class="ingredients-list">
          Ingrédients: {{ plat.ingredients?.map(ing => ing.nom).join(', ') }}
        </div>
        <button @click="() => {
          const categorieId = plat.categorie?.id;
          editPlat = {
            ...plat,
            categorie: categorieId,
            ingredients: plat.ingredients?.map(ing => ing.id) || []
          };
          console.log('Édition du plat avec catégorie:', categorieId);
        }" class="btn-edit">Éditer</button>
        <button @click="() => deletePlat(plat)" class="btn-delete">Supprimer</button>
      </li>
    </ul>

    <div v-if="editPlat" class="edit-form">
      <h2>Édition du plat</h2>
      <div>
        <label for="nom">Nom</label>
        <input id="nom" v-model="editPlat.nom" class="input-field" placeholder="Nom" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="editPlat.description" class="textarea-field" required></textarea>
      </div>
      <div>
        <label for="duration">Durée (min)</label>
        <input id="duration" type="number" v-model="editPlat.duration" class="input-field" required />
      </div>
      <div>
        <label for="categorie">Catégorie</label>
        <select id="categorie" v-model="editPlat.categorie" class="select-field" required>
          <option value="" disabled>-- Sélectionnez une catégorie --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.nom }}
          </option>
        </select>
      </div>
      <div class="ingredients-section">
        <h3 class="section-title">Ingrédients</h3>
        <div class="ingredients-grid">
          <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-item">
            <input
              type="checkbox"
              :id="'edit-ingredient-' + ingredient.id"
              :value="ingredient.id"
              v-model="editPlat.ingredients"
            >
            <label :for="'edit-ingredient-' + ingredient.id">{{ ingredient.nom }}</label>
          </div>
        </div>
      </div>
      <div class="edit-actions">
        <button @click="updatePlat" class="btn-primary">Mettre à jour</button>
        <button @click="() => { editPlat = null; }" class="btn-cancel">Annuler</button>
      </div>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<style scoped>
* {
  color: #000; /* Définit la couleur de texte noire pour tous les éléments */
}

h1, h2, h3, p, input, textarea, select {
  color: #000; /* S'assure que le texte dans les en-têtes, paragraphes, et champs de saisie est noir */
}

textarea, input[type="text"], input[type="number"], select {
  color: #000; /* S'assure que le texte dans les champs de saisie est noir */
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  max-width: 800px;
  margin: auto;
  background-color: white;
  border: 2px solid #000;
}

.add-form, .edit-form {
  background: white;
  padding: 20px;
  border: 2px solid #000;
  width: 100%;
  margin-bottom: 20px;
}

h1, h2, h3 {
  color: #000;
}

h1 {
  margin-bottom: 20px;
  font-size: 30px;
}

h3 {
  margin-top: 20px;
  font-size: 20px;
}

textarea, input[type="text"], input[type="number"], select {
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  font-size: 16px;
  color: #000;
  margin-bottom: 15px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

select {
  background-color: white;
}

button {
  padding: 10px;
  background: #f0f0f0;
  border: 1px solid #000;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e0e0e0;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.ingredient-item {
  display: flex;
  align-items: center;
}

.ingredient-item input {
  margin-right: 10px;
}

.list {
  list-style: none;
  padding: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
  margin-bottom: 5px;
}

.list-item span {
  font-size: 16px;
}

.list-item button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background: #f0f0f0;
  border: 1px solid #000;
  transition: background-color 0.3s;
}

.list-item button:hover {
  background-color: #e0e0e0;
}

.list-item button.edit {
  color: #27ae60;
}

.list-item button.delete {
  color: #e74c3c;
}

.edit-actions button {
  margin-right: 10px;
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

.edit-form {
  animation: slideIn 0.3s ease-out;
}


</style>
