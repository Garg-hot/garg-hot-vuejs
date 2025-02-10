<script setup>
import { ref, onMounted } from "vue";
import venteService from "../../services/VenteService";

const ventes = ref([]);
const newVente = ref({ nom: "" });
const editVente = ref(null);
const errorMessage = ref("");

// Charger toutes les ventes au montage du composant
const fetchVentes = async () => {
  console.log("Début fetchVentes...");
  try {
    const response = await venteService.getAllVentes();
    console.log("Réponse brute de l'API:", response);
    ventes.value = response;
    console.log("Ventes après assignation:", ventes.value);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    errorMessage.value = "Erreur lors du chargement des ventes.";
    console.error(error);
  }
};

// Ajouter une vente
const addVente = async () => {
  console.log("Tentative d'ajout de vente:", newVente.value);
  if (!newVente.value.nom) return;
  try {
    const response = await venteService.createVente(newVente.value);
    console.log("Réponse de création:", response);
    ventes.value.push(response.vente);
    newVente.value.nom = "";
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    errorMessage.value = "Erreur lors de l'ajout de la vente.";
    console.error(error);
  }
};

// Mettre à jour une vente
const updateVente = async () => {
  if (!editVente.value) return;
  try {
    await venteService.updateVente(editVente.value.id, editVente.value);
    ventes.value = ventes.value.map(vnt =>
      vnt.id === editVente.value.id ? { ...editVente.value } : vnt
    );
    editVente.value = null;
  } catch (error) {
    errorMessage.value = "Erreur lors de la mise à jour de la vente.";
    console.error(error);
  }
};

// Supprimer une vente
const deleteVente = async (vente) => {
  try {
    await venteService.deleteVente(vente.id);
    ventes.value = ventes.value.filter(vnt => vnt.id !== vente.id);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression de la vente.";
    console.error(error);
  }
};

onMounted(() => {
  console.log("Composant Vente monté");
  fetchVentes();
});
</script>

<template>
  <div class="vente-container">
    <div class="vente-form">
      <h1>Ventes</h1>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Formulaire d'ajout -->
      <div class="add-form">
        <input v-model="newVente.nom" placeholder="Nom de la vente" required />
        <button @click="addVente">Ajouter</button>
      </div>

      <!-- Liste des ventes -->
      <ul>
        <li v-for="vente in ventes" :key="vente.id">
          {{ vente.nom }}
          <button @click="editVente = { ...vente }">Éditer</button>
          <button @click="deleteVente(vente)">Supprimer</button>
        </li>
      </ul>

      <!-- Formulaire d'édition -->
      <div v-if="editVente" class="edit-form">
        <h2>Édition de la vente</h2>
        <div>
          <label for="nom">Nom</label>
          <input id="nom" v-model="editVente.nom" placeholder="Nom" required />
        </div>
        <div class="edit-actions">
          <button @click="updateVente">Mettre à jour</button>
          <button @click="editVente = null">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vente-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  color: #000;
}

.vente-form {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 300px;
}

.vente-list {
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
