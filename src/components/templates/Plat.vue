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
  <div>
    <h1>Plats</h1>

    <div class="add-form">
      <input v-model="newPlat.nom" placeholder="Nom du plat" />
      <br>
      <textarea v-model="newPlat.description" placeholder="Description"></textarea>
      <br>
      <input v-model="newPlat.duration" type="number" placeholder="Durée (min)" />
      <br>
      <select v-model="newPlat.categorie" required>
        <option value="" disabled selected>-- Sélectionnez une catégorie --</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.nom }}
        </option>
      </select>
      <br>
      <div class="ingredients-section">
        <h3>Ingrédients</h3>
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
      <button @click="addPlat">Ajouter</button>
    </div>

    <ul>
      <li v-for="plat in plats" :key="plat.id">
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
        }">Éditer</button>
        <button @click="() => deletePlat(plat)">Supprimer</button>
      </li>
    </ul>

    <div v-if="editPlat" class="edit-form">
      <h2>Édition du plat</h2>
      <div>
        <label for="nom">Nom</label>
        <input id="nom" v-model="editPlat.nom" placeholder="Nom" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="editPlat.description" required></textarea>
      </div>
      <div>
        <label for="duration">Durée (min)</label>
        <input id="duration" type="number" v-model="editPlat.duration" required />
      </div>
      <div>
        <label for="categorie">Catégorie</label>
        <select id="categorie" v-model="editPlat.categorie" required>
          <option value="" disabled>-- Sélectionnez une catégorie --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.nom }}
          </option>
        </select>
      </div>
      <div class="ingredients-section">
        <h3>Ingrédients</h3>
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
        <button @click="updatePlat">Mettre à jour</button>
        <button @click="() => { editPlat = null; }">Annuler</button>
      </div>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.add-form, .edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.add-form input,
.add-form textarea,
.add-form select,
.edit-form input,
.edit-form textarea,
.edit-form select {
  width: 100%;
  max-width: 600px;
}

.ingredients-section {
  margin: 1rem 0;
  width: 100%;
  max-width: 600px;
  align-self: center;
}

.ingredients-section h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #666;
  text-align: center;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  margin: 0.5rem auto;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  padding: 0.25rem;
}

.ingredient-item:nth-child(4n+1),
.ingredient-item:nth-child(4n+2) {
  background-color: #f9f9f9;
}

.ingredients-list {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.ingredients-list::before {
  content: "🥗";
  margin-right: 0.5rem;
}

.edit-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
}
</style>
