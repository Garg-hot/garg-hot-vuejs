<script setup>
import { ref, onMounted } from "vue";
import commandeService from "../../services/CommandeService";

const commandes = ref([]);
const newCommande = ref({ statut: 0, id_client: "" });
const editCommande = ref(null);
const errorMessage = ref("");

// Charger toutes les commandes au montage du composant
const fetchCommandes = async () => {
  console.log("Début fetchCommandes...");
  try {
    const response = await commandeService.getAllCommandes();
    console.log("Réponse brute de l'API:", response);
    commandes.value = response;
    console.log("Commandes après assignation:", commandes.value);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    errorMessage.value = "Erreur lors du chargement des commandes.";
    console.error(error);
  }
};

// Ajouter une commande
const addCommande = async () => {
  console.log("Tentative d'ajout de commande:", newCommande.value);
  if (!newCommande.value.id_client) return;
  try {
    const response = await commandeService.createCommande(newCommande.value);
    console.log("Réponse de création:", response);
    commandes.value.push(response.commande);
    newCommande.value.id_client = "";
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    errorMessage.value = "Erreur lors de l'ajout de la commande.";
    console.error(error);
  }
};

// Mettre à jour une commande
const updateCommande = async () => {
  if (!editCommande.value) return;
  try {
    await commandeService.updateCommande(editCommande.value.id, editCommande.value);
    commandes.value = commandes.value.map(cmd =>
      cmd.id === editCommande.value.id ? { ...editCommande.value } : cmd
    );
    editCommande.value = null;
  } catch (error) {
    errorMessage.value = "Erreur lors de la mise à jour de la commande.";
    console.error(error);
  }
};

// Supprimer une commande
const deleteCommande = async (commande) => {
  try {
    await commandeService.deleteCommande(commande.id);
    commandes.value = commandes.value.filter(cmd => cmd.id !== commande.id);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression de la commande.";
    console.error(error);
  }
};

onMounted(() => {
  console.log("Composant Commande monté");
  fetchCommandes();
});
</script>

<template>
  <div class="commande-container">
    <div class="commande-form">
      <h1>Commandes</h1>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Formulaire d'ajout -->
      <div class="add-form">
        <input v-model="newCommande.id_client" placeholder="ID du client" required />
        <button @click="addCommande">Ajouter</button>
      </div>

      <!-- Liste des commandes -->
      <ul>
        <li v-for="commande in commandes" :key="commande.id">
          Commande ID: {{ commande.id }} - Statut: {{ commande.statut }} - Client ID: {{ commande.id_client }}
          <button @click="editCommande = { ...commande }"class="action-button edit">Éditer</button>
          <button @click="deleteCommande(commande)"class="action-button delete">Supprimer</button>
        </li>
      </ul>

      <!-- Formulaire d'édition -->
      <div v-if="editCommande" class="edit-form">
        <h2>Édition de la commande</h2>
        <div>
          <label for="statut">Statut</label>
          <input id="statut" v-model="editCommande.statut" placeholder="Statut" required />
        </div>
        <div>
          <label for="id_client">ID Client</label>
          <input id="id_client" v-model="editCommande.id_client" placeholder="ID Client" required />
        </div>
        <div class="edit-actions">
          <button @click="updateCommande">Mettre à jour</button>
          <button @click="editCommande = null">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commande-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  color: #000;
}

.commande-form {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 300px;
}

.commande-list {
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
