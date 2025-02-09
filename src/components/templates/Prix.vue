<script setup>
import { ref, onMounted } from "vue";
import prixService from "../../services/PrixService";
import platService from "../../services/PlatService"; // Assurez-vous d'importer le service des plats

const prixList = ref([]);
const newPrix = ref({ montant: "", platId: null });
const errorMessage = ref("");
const plats = ref([]); // Pour stocker les plats

// Charger tous les prix et plats au montage du composant
const fetchPrix = async () => {
  try {
    const response = await prixService.getAllPrix();
    prixList.value = response;
    console.log('Prix chargés:', prixList.value);
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des prix.";
    console.error('Erreur dans fetchPrix:', error);
  }
};

const fetchPlats = async () => {
  try {
    const response = await platService.getAllPlats();
    plats.value = response;
    console.log('Plats chargés:', plats.value); // Vérifiez ici la structure des données
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des plats.";
    console.error('Erreur dans fetchPlats:', error);
  }
};

// Ajouter un prix
const addPrix = async () => {
  if (!newPrix.value.montant || !newPrix.value.platId) {
    console.warn('Montant ou platId manquant lors de l\'ajout d\'un prix');
    return;
  }
  try {
    // Créer l'objet à envoyer à l'API
    const prixData = {
      plat: {
        id: newPrix.value.platId, // Utiliser l'ID du plat sélectionné
        nom: plats.value.find(plat => plat.id === newPrix.value.platId)?.nom // Récupérer le nom du plat
      },
      montant: newPrix.value.montant
    };

    const response = await prixService.createPrix(prixData);
    prixList.value.push(response);
    newPrix.value = { montant: "", platId: null }; // Réinitialiser le formulaire
    console.log('Prix ajouté:', response);
  } catch (error) {
    errorMessage.value = "Erreur lors de l'ajout du prix.";
    console.error('Erreur dans addPrix:', error);
  }
};

// Supprimer un prix
const deletePrix = async (prix) => {
  console.log('Tentative de suppression du prix avec ID:', prix.id); // Log pour vérifier l'ID
  try {
    await prixService.deletePrix(prix.id);
    prixList.value = prixList.value.filter(p => p.id !== prix.id); // Mettre à jour la liste après suppression
    console.log('Prix supprimé:', prix);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression du prix.";
    console.error('Erreur dans deletePrix:', error);
  }
};

onMounted(() => {
  fetchPrix();
  fetchPlats(); // Charger les plats au montage
});
</script>

<template>
  <div class="prix-container">
    <div class="prix-form">
      <h2>Ajouter un Prix</h2>
      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <!-- Formulaire d'ajout -->
      <div class="add-form">
        <div class="form-group">
          <input v-model="newPrix.montant" placeholder="Montant" required />
        </div>
        <div class="form-group">
          <select v-model="newPrix.platId" required>
            <option v-for="plat in plats" :key="plat.id" :value="plat.id">{{ plat.nom }}</option>
          </select>
        </div>
        <button @click="addPrix" class="form-button">Ajouter</button>
      </div>
    </div>

    <!-- Liste des prix -->
    <div class="prix-list">
      <h2>Liste des Prix</h2>
      <div class="list-container">
        <div v-for="prix in prixList" :key="prix.id" class="list-item">
          <div class="item-info">
            <span class="item-name">{{ prix.montant }} - {{ prix.datePrix }} - {{ prix.plat.nom }}</span>
            <div class="item-actions">
              <button @click="deletePrix(prix)" class="action-button delete">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prix-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  color: #000;
}

.prix-form {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 300px;
}

.prix-list {
  background: white;
  padding: 30px;
  border: 2px solid #000;
  width: 100%;
  max-width: 500px;
}

.add-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-input,
select {
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
  margin-top: 10px;
  color: #000;
}

.form-button:hover {
  background-color: #f0f0f0;
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

.action-button.delete {
  color: #e74c3c;
}
</style>
